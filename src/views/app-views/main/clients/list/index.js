import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Table, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import ClientView from './ClientView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Loading from 'components/shared-components/Loading';
import { deleteClientReq, getClientsListReq } from 'api/main/clientsApi';
import { getClientsList } from 'redux/actions/main/Clients';

export class ClientsList extends Component {
	
	state = {
		clientProfileVisible: false,
		selectedClient: null
	}

	componentDidMount() {
		getClientsListReq().then( res => {
			this.props.getClientsList(res);
		})
  }

	deleteClient = (clientId, username) => {
		deleteClientReq(clientId).then((res) => {
			if (!res) {
				message.error({ content: `User ${username} has not been deleted`, duration: 2 });
				return
			}
			const newClientsList = this.props.clientsList.filter(item => item.id !== clientId);
			this.props.getClientsList(newClientsList);
			message.success({ content: `Deleted user ${username}`, duration: 2 });
		});
	}

	showClientProfile = clientInfo => {
		this.setState({
			clientProfileVisible: true,
			selectedClient: clientInfo
		});
	};
	
	closeClientProfile = () => {
		this.setState({
			clientProfileVisible: false,
			selectedClient: null
    });
	}

	toEditingClientProfile = (id) => {
		window.location.href = `/app/main/clients/edit-profile:${id}`;
	}

	render() {
		const { clientProfileVisible, selectedClient } = this.state;
		const tableColumns = [
			{
				title: 'Client',
				dataIndex: 'name',
				render: (_, record) => (
					<div className="d-flex">
						<AvatarStatus 
							src={"/img/avatars/defaultAvatar.jpg"} 
							name={record.name} 
							subTitle={record.email}
							onNameClick={() => this.toEditingClientProfile(record.id)}
						/>
					</div>
				),
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Username',
				dataIndex: 'username',
				sorter: {
					compare: (a, b) => {
						a = a.username.toLowerCase();
						b = b.username.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Web site',
				dataIndex: 'website',
				sorter: {
					compare: (a, b) => {
						a = a.website.toLowerCase();
						b = b.website.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Phone',
				dataIndex: 'phone',
				sorter: {
					compare: (a, b) => {
						a = a.phone;
						b = b.phone;
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right">
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {this.showClientProfile(elm)}} size="small"/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={()=> {this.deleteClient(elm.id, elm.username)}} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];

		if (this.props.loading) {
			return <Loading />
		}

		return (
			<Card bodyStyle={{'padding': '0px'}}>
			 	<Table columns={tableColumns} dataSource={this.props.clientsList} rowKey='id' />
			 	<ClientView data={selectedClient} visible={clientProfileVisible} close={()=> {this.closeClientProfile()}}/>
		 	</Card>
		)
	}
}

const mapStateToProps = ({clients}) => {
	const { clientsList, loading } = clients;
  return { clientsList, loading }
}

const mapDispatchToProps=(dispatch)=>({
	getClientsList: (data) => dispatch(getClientsList(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientsList);
