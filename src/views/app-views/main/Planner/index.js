import React, { useState } from 'react';
import { Button, message } from 'antd';
import PlannerService from 'services/main/PlannerService';
import { DeleteOutlined } from '@ant-design/icons';
import plannerData from 'assets/data/planner.data.json';

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
		}

		let movingItem;

		if (e.target.parentElement.id === 'field') {
			movingItem = e.target.cloneNode(true);
			e.target.remove();
		} else {
			movingItem = document.createElement('img');
			movingItem.style.position = 'absolute';
			movingItem.style.zIndex = 1000;
			movingItem.style.width = '80px';
			movingItem.style.height = '80px';
			movingItem.style.left = e.pageX - movingItem.offsetWidth / 2 + 'px';
			movingItem.style.top = e.pageY - movingItem.offsetHeight / 2 + 'px';
			movingItem.id = e.target.id;
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
			const staticItem = movingItem.cloneNode(true);

			movingItem.remove();
			field.append(staticItem);
			const relativeLeft = ( (itemCoords.left - fieldCoords.left) / field.offsetWidth ) * 100;
			const relativeTop = ( (itemCoords.top - fieldCoords.top) / field.offsetHeight ) * 100;
			staticItem.style.left = relativeLeft + '%';
			staticItem.style.top = relativeTop + '%';
			document.removeEventListener('mousemove', onMouseMove);
			staticItem.addEventListener('mousedown', moveItem);

			if (itemCoords.left < fieldCoords.left || itemCoords.right > fieldCoords.right) {
				staticItem.remove();
			}
			if (itemCoords.bottom > fieldCoords.bottom || itemCoords.top < fieldCoords.top) {
				staticItem.remove();
			}
			
			const newFieldItems = fieldItems.slice(0);
			newFieldItems.push(
				{
					id: staticItem.id,
					name: staticItem.name,
					left: relativeLeft,
					top: relativeTop
				}
			)
			setFieldItems(newFieldItems);
		};
	};

	const savePlan = () => {
		PlannerService.save({fieldItems}).then((res) => {
			if (!res) {
				message.error({ content: `Plan didn't save!`, duration: 2 });
				return
			}
			message.success({ content: `Plan was saved!`, duration: 2 });
		})
	}

	const deletePlan = () => {
		setFieldItems([]);
		const field = document.getElementById('field');
		while (field.firstChild) {
			field.firstChild.remove();
		}
	}

	const uploadPlan = () => {
		const field = document.getElementById('field');
		while (field.firstChild) {
			field.firstChild.remove();
		}
		plannerData.forEach((dataItem) => {
			const item = document.createElement('img');
			item.style.position = 'absolute';
			item.style.zIndex = 1000;
			item.style.width = '80px';
			item.style.height = '80px';
			item.id = dataItem.id;
			item.name = dataItem.name;
			item.src = `/img/furniture/${dataItem.name}.jpg`;
			field.append(item);
			item.style.left = dataItem.left + '%';
			item.style.top = dataItem.top + '%';
			item.addEventListener('mousedown', moveItem);
		});
		setFieldItems(plannerData);
	}

	const furnitureDivStyle = {
		textAlign: 'center', 
		border: '2px solid black', 
		marginRight: '4px',
	}

	const furnitureListStyle = {
		display: 'flex',
		flexWrap: 'nowrap',
		marginRight: '10px',
		width: '90%',
		height : '150px',
		overflowY: 'hidden',
	};

	const fieldDivStyle = {
		width: '60%',
		height : '550px',
		borderRadius: '30px',
		border: '2px solid black'
	}

	const fieldStyle = {
		width: '90%',
		height : '80%',
		position: 'relative',
		border: '2px solid black',
		marginLeft: 'auto', 
		marginRight: 'auto',
		marginTop: '10px',
	};
	const plannerStyle = {
		display: 'flex',
		justifyContent: 'space-between'
	};

	const buttonDivStyle = {
		display: 'flex',
		marginTop: '150px',
		width: '90%',
		justifyContent: 'space-between'
	}

	const uploadButtonStyle = {
		display: 'block', 
		marginLeft: 'auto', 
		marginRight: '15px',
		marginTop: '5px',
	}

	const furnitureList = furnitureName.map((name, index) => {
		return (
			<div style={furnitureDivStyle} key={name+index}>
				<img id={name+index} name={name} width="80" height="80" src={`/img/furniture/${name}.jpg`}  alt="furniture" onMouseDown={(e) => moveItem(e)} />
				<span>{name}</span>
			</div>	
		)	
	});

	return (
		<>
			<div style={plannerStyle}>
				<div style={{width: '45%'}}>
					<div style={furnitureListStyle}>
						{furnitureList}
					</div>
					<div style={buttonDivStyle}>
						<Button type="primary" onClick={() => savePlan()}>Save plan</Button>
						<Button type="primary" danger onClick={() => deletePlan()}>Delete plan</Button>
						<DeleteOutlined style={{fontSize: '45px'}}></DeleteOutlined>
					</div>
				</div>
				<div style={fieldDivStyle}>
					<Button type="primary" style={uploadButtonStyle} onClick={() => uploadPlan()}>Upload plan</Button>
					<div id="field" style={fieldStyle}>
					</div>
				</div>
			</div>
		</>
	)
}

export default Planner