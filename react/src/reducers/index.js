import taskReducer from './taskReducer';
import {combineReducers} from 'redux';
import clientReducers from './clientReducers'

export default combineReducers({
	tasks: taskReducer,
	clients: clientReducers
});
