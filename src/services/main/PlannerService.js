import { message } from 'antd';
import { api } from '../../api';

const PlannerService = {}

PlannerService.save = async (body) => {
  try {
    const res = await api.post('users', body);
    return res;
  } catch (err) {
    console.log(err);
    message.error({ content: err.message, duration: 2 });
  }
};

export default PlannerService;