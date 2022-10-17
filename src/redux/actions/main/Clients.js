import {
  GET_CLIENTS_LIST,
  GET_CLIENT
} from '../../constants/main/Clients';

export const getClientsList = (clientsList) => {
  return {
    type: GET_CLIENTS_LIST,
    payload: clientsList
  };
};

export const getClient = (client) => {
  return {
    type: GET_CLIENT,
    payload: client
  };
};