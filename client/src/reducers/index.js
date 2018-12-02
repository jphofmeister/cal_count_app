import { combineReducers } from 'redux';
// import authReducer from './authReducer';
import errorReducer from './errorReducer';
// import wineReducer from './wineReducer';

export default combineReducers({
  errors: errorReducer
});