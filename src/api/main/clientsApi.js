import { message } from 'antd';
import { api } from '../index';

export const getClientsListReq = async () => {
  try {
    const res = await api.get('users');
    return res;
  } catch (err) {
    console.log(err);
    message.error({ content: err.message, duration: 2 });
  }
};

export const deleteClientReq = async (clientId) => {
  try {
    const res = await api.delete(`users/${clientId}`);
    return res;
  } catch (err) {
    console.log(err);
    message.error({ content: err.message, duration: 2 });
  }
};