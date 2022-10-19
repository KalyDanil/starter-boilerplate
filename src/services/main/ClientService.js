import { message } from 'antd';
import { api } from '../../api';

const ClientService = {}

ClientService.getList = async () => {
  try {
    const res = await api.get('users');
    return res;
  } catch (err) {
    console.log(err);
    message.error({ content: err.message, duration: 2 });
  }
};

ClientService.deleteOne = async (clientId) => {
  try {
    const res = await api.delete(`users/${clientId}`);
    return res;
  } catch (err) {
    console.log(err);
    message.error({ content: err.message, duration: 2 });
  }
};

ClientService.getOne = async (clientId) => {
  try {
    const res = await api.get(`users/${clientId}`);
    return res;
  } catch (err) {
    console.log(err);
    message.error({ content: err.message, duration: 2 });
  }
};

ClientService.editProfile = async (clientId, body) => {
  try {
    await api.put(`users/${clientId}`, body);
  } catch (err) {
    console.log(err);
    message.error({ content: err.message, duration: 2 });
  }
};

export default ClientService;