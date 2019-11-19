import axios from 'axios';
import {
	ADD_CLIENTS,
	FETCH_CLIENT,
	UPDATE_ONE_CLIENT,
	UPDATE_MOCKS_CLIENT_PSEUDO,
	UPDATE_MOCKS_CLIENT_PASSWORD,
	DELETE_CLIENTS,
	UPDATE_CLIENTS,
	SAVE_NUM_CLIENT
} from '../actions/typesClients';

const initState = {
	dataClients: [
		// {
		// 	id:"1",
		// 	pseudo:"blackran",
		// 	password: "pass"
		// }
	],
	mocksClientPseudo: '',
	mocksClientPassword: '',
	one: true,
	submitReusit: true,
	saveNumCli: []
}
const clientReducers = (state = initState, action) => {
	switch (action.type) {
		case ADD_CLIENTS:
			state.dataClients = [
				...state.dataClients,
				action.data
			];
			axios.post("http://localhost:8080/clients/add", action.data)
			.then(h => console.log(h))
			.catch(err => console.log("error parsing:\n", err));
			return Object.assign({}, state, state.dataClients);

		case DELETE_CLIENTS:
			const st = state.dataClients.filter(e => {
				return e.id !== action.id;
			});
			state.dataClients = [...st]
			axios.delete("http://localhost:8080/clients/" + action.id)
			.then((e) => console.log(e))
			.catch(err => console.log("error parsing:\n", err));
			return Object.assign({}, state, state.clients);

		case UPDATE_CLIENTS:
			const std1 = state.tasks.filter(e => {
				return e.id !== action.id;
			});
			const sto1 = action.data;
			state.tasks = [
				...std1, ...sto1
			];
			return Object.assign({}, state, state.tasks);

		case SAVE_NUM_CLIENT:
			state.saveNumCli = [];
			state.saveNumCli = action.data;
			return Object.assign({}, state, state.saveNumCli);

		case FETCH_CLIENT:
			state.dataClients = [];
			state.dataClients = [
				...state.dataClients,
				...action.data
			];
			return Object.assign({}, state, state.dataClients);

		case UPDATE_ONE_CLIENT:
			state.one = action.data;
			return Object.assign({}, state, state.one);

		case UPDATE_MOCKS_CLIENT_PSEUDO:
			state.mocksClientPseudo = action.data;
			return Object.assign({}, state, state.mocksClientPseudo);

		case UPDATE_MOCKS_CLIENT_PASSWORD:
			state.mocksClientPassword = action.data;
			return Object.assign({}, state, state.mocksClientPassword);

		default:
			return state;
	}
}

export default clientReducers;
