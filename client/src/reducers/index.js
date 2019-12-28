//import authReducer
//combine with combine reducers call, combine reducers is from react redux library
//then we export it from this file 
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});