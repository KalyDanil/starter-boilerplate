import React, { useState } from 'react';
import { Button, message } from 'antd';
import PlannerService from 'services/main/PlannerService';
import { DeleteOutlined } from '@ant-design/icons';
import plannerData from 'assets/data/planner.data.json';
import { PlannerStyle } from './PlannerStyle';
import Furniture from './Furniture';
import { nanoid } from 'nanoid/non-secure';
import AddedFurniture from './AddedFurniture';

const furnitureName = [
	'Armchair',
	'Armchair with stand',
	'Big table',
	'Cupboard',
	'Dinner table',
	'Mini sofa',
	'Office chair',
	'Office table',
	'Oval dining table',
	'Sofa',
	'Wooden chair'
];

const Planner = () => {
	const [fieldItems, setFieldItems] = useState([]);

	const moveItem = (e) => {
		const onMouseMove = (e) => {
			movingItem.style.left = e.pageX - movingItem.offsetWidth / 2 + 'px';
			movingItem.style.top = e.pageY - movingItem.offsetHeight / 2 + 'px';
		};

		let movingItem;
		let newFieldItems = fieldItems.slice(0);
		let itemFromField;

		if (e.target.parentElement.id === 'field') {
			movingItem = e.target.cloneNode(true);
			newFieldItems = fieldItems.filter((item) => item.id !== e.target.id);
			itemFromField = e.target.id;
			setFieldItems(newFieldItems)
		} else {
			movingItem = document.createElement('img');
			movingItem.style.position = 'absolute';
			movingItem.style.zIndex = 1000;
			movingItem.style.width = '80px';
			movingItem.style.height = '80px';
			movingItem.id = nanoid();
			movingItem.name = e.target.name;
			movingItem.src = `/img/furniture/${e.target.name}.jpg`;
		}

		const field = document.getElementById('field');
		document.body.append(movingItem);
		document.addEventListener('mousemove', onMouseMove);
		movingItem.style.left = e.pageX - movingItem.offsetWidth / 2 + 'px';
    movingItem.style.top = e.pageY - movingItem.offsetHeight / 2 + 'px';
		movingItem.ondragstart = () => {
			return false;
		};
		movingItem.onmouseup = () => {
			const fieldCoords = field.getBoundingClientRect();
			const itemCoords = movingItem.getBoundingClientRect();
			const relativeLeft = ( (itemCoords.left - fieldCoords.left) / field.offsetWidth ) * 100;
			const relativeTop = ( (itemCoords.top - fieldCoords.top) / field.offsetHeight ) * 100;

			document.removeEventListener('mousemove', onMouseMove);;

			if (itemCoords.left < fieldCoords.left || itemCoords.right > fieldCoords.right) {
				movingItem.remove();
				setFieldItems(newFieldItems);
				return;
			}
			if (itemCoords.bottom > fieldCoords.bottom || itemCoords.top < fieldCoords.top) {
				movingItem.remove();
				setFieldItems(newFieldItems);
				return;
			}
			
			if (itemFromField) {
				newFieldItems = fieldItems.filter((item) => item.id !== itemFromField);
			}
			newFieldItems.push(
				{
					id: movingItem.id,
					name: movingItem.name,
					left: relativeLeft,
					top: relativeTop
				}
			);
			movingItem.remove();
			setFieldItems(newFieldItems);
		};
	};

	const savePlan = () => {
		if (fieldItems.length === 0) {
			message.error({ content: `First you need to create a plan.`, duration: 2 });
			return;
		}
		PlannerService.save({fieldItems}).then((res) => {
			if (!res) {
				message.error({ content: `Plan didn't save!`, duration: 2 });
				return;
			}
			message.success({ content: `Plan was saved!`, duration: 2 });
		});
	};

	const deletePlan = () => {
		setFieldItems([]);
	};

	const uploadPlan = () => {
		setFieldItems(plannerData)
	};

	const furnitureList = furnitureName.map((name, index) => {
		return Furniture(name, index, moveItem);
	});

	const planfurniture = fieldItems.map((item, index) => {
		return AddedFurniture(item, index, moveItem)
	});

	return (
		<PlannerStyle>
			<div className="controller">
				<div className="controller__furnitureList" >
					{furnitureList}
				</div>
				<div className="controller__buttonDiv" >
					<Button type="primary" onClick={() => savePlan()}>Save plan</Button>
					<Button type="primary" danger onClick={() => deletePlan()}>Delete plan</Button>
					<DeleteOutlined style={{fontSize: '45px'}}></DeleteOutlined>
				</div>
			</div>
			<div className="fieldDiv" >
				<div className="fieldDiv__topLine">
					<h1>Room layout</h1>
					<Button type="primary"  onClick={() => uploadPlan()}>Upload plan</Button>
				</div>
				<div id="field" className="fieldDiv__field" >
					{fieldItems.length === 0 ? <></> : planfurniture}
				</div>
			</div>
		</PlannerStyle>
	);
};

export default Planner;