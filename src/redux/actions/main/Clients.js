import {
  GET_CLIENTS_LIST
} from '../../constants/main/Clients';

export const getClientsList = (clientsList) => {
  return {
    type: GET_CLIENTS_LIST,
    payload: clientsList
  };
};