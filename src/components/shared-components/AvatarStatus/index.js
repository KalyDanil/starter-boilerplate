import React from 'react';
import PropTypes from 'prop-types'
import { Avatar } from 'antd';

const renderAvatar = props => {
	return (
	<Avatar 
		{...props} 
		className={`ant-avatar-${props.type}`} 
		onClick={() => props.onClick()}
	>
		{props.text}
	</Avatar>
	)
}

export const AvatarStatus = props => {
	const { name, suffix, subTitle, type, src, icon, size, shape, gap, text, onNameClick } = props
	const onClick = onNameClick;
	return (
		<div className="avatar-status d-flex align-items-center">
			{renderAvatar({icon, src, type, size, shape, gap, text, onClick })}
			<div className="ml-2">
				<div>
					{
						onNameClick ? 
						<div onClick={() => onNameClick()} className="avatar-status-name clickable">{name}</div> 
						:
						<div className="avatar-status-name">{name}</div>
					}
					<span>{suffix}</span>
				</div>
				<div className="text-muted avatar-status-subtitle">{subTitle}</div>
			</div>
		</div>
	)
}

AvatarStatus.propTypes = {
	name: PropTypes.string,
	src: PropTypes.string,
	type: PropTypes.string,
	onNameClick: PropTypes.func
}


export default AvatarStatus;
