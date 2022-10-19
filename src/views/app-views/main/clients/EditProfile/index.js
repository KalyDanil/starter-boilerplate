import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Avatar, Button, Input, Row, Col, message, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex'
import ClientService from 'services/main/ClientService';
import { getClient } from 'redux/actions/main/Clients';
import Loading from 'components/shared-components/Loading';

export class EditProfile extends Component {

	avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'

	state= {
		avatarUrl: '/img/avatars/defaultAvatar.jpg',
	}

	id = window.location.pathname.split(':')[1]

	componentDidMount() {
		ClientService.getOne(this.id).then( res => {
			this.props.getClient(res);
		})
  }

	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	render() {

		const onFinish = values => {
			const key = 'updatable';
			message.loading({ content: 'Updating...', key });
			setTimeout(() => {
				ClientService.editProfile(this.id, {
					name: values.name,
					username: values.username,
					company: values.company,
					email: values.email,
					phone: values.phone,
					city: values.city,
					street: values.street,
					suite: values.suite,
					zipcode: values.zipcode,
					website: values.website,
				}).then(() => {
					message.success({ content: 'Done!', key, duration: 2 });
					window.location.href = `/app/main/clients/list`;
				})
			}, 1000);
		};
	
		const onFinishFailed = errorInfo => {
			console.log('Failed:', errorInfo);
		};

		const onUploadAavater = info => {
			const key = 'updatable';
			if (info.file.status === 'uploading') {
				message.loading({ content: 'Uploading...', key, duration: 1000 });
				return;
			}
			if (info.file.status === 'done') {
				this.getBase64(info.file.originFileObj, imageUrl =>
					this.setState({
						avatarUrl: imageUrl,
					}),
				);
				message.success({ content: 'Uploaded!', key,  duration: 1.5 });
			}
		};

		const onRemoveAvater = () => {
			this.setState({
				avatarUrl: ''
			})
		}

		const { name, username, email, address, phone, website, company } = this.props.selectedClient;

		if (this.props.loading) {
			return <Loading />
		}

		return (
			<>
				<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
					<Avatar size={90} src={this.state.avatarUrl} icon={<UserOutlined />}/>
					<div className="ml-md-3 mt-md-0 mt-3">
						<Upload onChange={onUploadAavater} showUploadList={false} action={this.avatarEndpoint}>
							<Button type="primary">Change Avatar</Button>
						</Upload>
						<Button className="ml-2" onClick={onRemoveAvater}>Remove</Button>
					</div>
				</Flex>
				<div className="mt-4">
					<Form
						name="basicInformation"
						layout="vertical"
						initialValues={
							{ 
								'name': name,
								'username': username,
								'company': company.name,
								'email': email,
								'phone': phone,
								'city': address.city,
								'street': address.street,
								'suite': address.suite,
								'zipcode': address.zipcode,
								'website': website,
							}
						}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col xs={24} sm={24} md={24} lg={16}>
								<Row gutter={ROW_GUTTER}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Name"
											name="name"
											rules={[
												{
													required: true,
													message: 'Please input your name!',
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Username"
											name="username"
											rules={[
												{
													required: true,
													message: 'Please input your username!'
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Phone"
											name="phone"
											rules={[
												{
													required: true,
													message: 'Please input your phone!'
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Email"
											name="email"
											rules={[{ 
												required: true,
												type: 'email',
												message: 'Please enter a valid email!' 
											}]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Company"
											name="company"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="City"
											name="city"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Street"
											name="street"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Suite"
											name="suite"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Zip-code"
											name="zipcode"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Website"
											name="website"
										>
											<Input />
										</Form.Item>
									</Col>
								</Row>
								<Button type="primary" htmlType="submit">
									Save Change
								</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

const mapStateToProps = ({clients}) => {
	const { selectedClient, loading } = clients;
  return { selectedClient, loading }
}

const mapDispatchToProps=(dispatch)=>({
	getClient: (data) => dispatch(getClient(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
