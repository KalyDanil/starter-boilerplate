import {
	GET_CLIENTS_LIST
} from '../../constants/main/Clients';

const initState = {
  loading: true,
  clientsList: [],
};

const clients = (state = initState, action) => {
	switch (action.type) {
		case GET_CLIENTS_LIST:
			let loading = false;
			if (action.payload === null) {
				loading = true;
			}
			return {
				...state,
				clientsList: action.payload,
				loading,
			}
		default:
			return state;
	}
};

export default clients;