import {
	GET_CLIENTS_LIST,
	GET_CLIENT
} from '../../constants/main/Clients';

const initState = {
  loading: true,
  clientsList: [],
	selectedClient: {},
};

const clients = (state = initState, action) => {
	switch (action.type) {
		case GET_CLIENTS_LIST:
			return {
				...state,
				clientsList: action.payload,
				loading: false,
			}
		case GET_CLIENT:
			return {
				...state,
				selectedClient: action.payload,
				loading: false,
			}
		default:
			return state;
	}
};

export default clients;