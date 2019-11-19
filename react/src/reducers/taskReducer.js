import {
	ADD_TASK,
	DELETE_TASK,
	UPDATE_MOCKS,
	CHECK_TASK,
	CHECK_TASK_ALL,
	UPDATE_TASK,
	UPDATE_TASK_EDIT,
	FETCH_TASK,
	UPDATE_MOCKS_EDIT,
	ACCEPT_UPDATE_EDIT,
	SET_DATA_DEFAULT
} from '../actions/typesTask';
import axios from 'axios';
const initState = {
	dataTasks: [
		// {
		// 	'id': '1',
		// 	task: 'task1',
		// 	etats: false
		// }
	],
	mocks: '',
	mocksEdit: '',
	one: true
}
const taskReducer = (state = initState, action) => {
	switch (action.type) {
		case DELETE_TASK:
			const st = state.dataTasks.filter(e => {
				return e.id !== action.id;
			});
			state.dataTasks = [...st]
			axios.delete("http://localhost:8080/task/"+action.id).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));
			return Object.assign({}, state, state.dataTasks);

		case CHECK_TASK:
			const std = state.dataTasks.filter(e => {
				return e.id !== action.id;
			});
			const sto = state.dataTasks.filter(e => {
				return e.id === action.id;
			});
			const Sto = {
				id: sto[0].id,
				task: sto[0].task,
				etats: !sto[0].etats,
				edit: sto.edit
			};
			state.dataTasks = [
				...std, Sto
			];
			axios.post("http://localhost:8080/task/update/"+action.id, Sto).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));
			return Object.assign({}, state, state.dataTasks);

		case UPDATE_TASK:
			const std1 = state.dataTasks.filter(e => {
				return e.id !== action.id;
			});
			const sto1 = action.data;
			state.dataTasks = [
				...std1, ...sto1
			];
			return Object.assign({}, state, state.dataTasks);

		case UPDATE_TASK_EDIT:
			const reinit = state.dataTasks.map(o => {
				return o.etats === true
					? ({id: o.id, task: o.task, etats: o.etats, edit: false})
					: o;
			});
			state.dataTasks = [...reinit];
			Object.assign({}, state, state.dataTasks);
			const std2 = state.dataTasks.filter(e => {
				return e.id !== action.id;
			});
			const sto2 = state.dataTasks.filter(e => {
				return e.id === action.id;
			});
			state.mocksEdit = sto2[0].task;
			state.dataTasks = [
				...std2, {
					id: sto2[0].id,
					task: sto2[0].task,
					etats: sto2[0].etats,
					edit: !sto2.edit
				}
			];
			return Object.assign({}, state, state.dataTasks);

		case CHECK_TASK_ALL:
			const ini = state.dataTasks.filter(j => {
				return j.etats === false;
			}).length !== 0;
			const sti = state.dataTasks.map(e => {
				return {id: e.id, task: e.task, etats: ini, edit: e.edit}
			});
			state.dataTasks = [...sti]
			state.dataTasks.map(j=>{
				return axios.post("http://localhost:8080/task/update/"+j.id, j).catch(err => console.log("error parsing:\n", err));
			});
			return Object.assign({}, state, state.dataTasks);

		case ADD_TASK:
			state.dataTasks = [
				...state.dataTasks,
				action.data
			];
			axios.post("http://localhost:8080/task/add", action.data)
			.then(h=>console.log(h))
			.catch(err => console.log("error parsing:\n", err));
			return Object.assign({}, state, state.dataTasks);

		case FETCH_TASK:
			state.dataTasks = [
				...state.dataTasks,
				...action.data
			];
			return Object.assign({}, state, state.dataTasks);

		case UPDATE_MOCKS:
			state.mocks = action.data;
			return Object.assign({}, state, state.mocks);

		case UPDATE_MOCKS_EDIT:
			state.mocksEdit = action.data;
			return Object.assign({}, state, state.mocksEdit);

		case ACCEPT_UPDATE_EDIT:
			const reinit1 = state.dataTasks.filter(o => {
				return o.id !== action.id;
			});
			state.dataTasks = [
				...reinit1,
				action.data
			];
			axios.post("http://localhost:8080/task/update/"+action.id, action.data).then((e) => console.log(e)).catch(err => console.log("error parsing:\n", err));
			return Object.assign({}, state, state.dataTasks);

		case SET_DATA_DEFAULT:
			state.dataTasks = [];
			state.mocks = '';
			return Object.assign({}, state, state.dataTasks);
			
		default:
			return state;
	}
}

export default taskReducer;
