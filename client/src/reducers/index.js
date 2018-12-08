import { combineReducers } from 'redux';
// import authReducer from './authReducer';
import errorReducer from './errorReducer';
import ingredientReducer from './ingredientReducer';
import foodReducer from './foodReducer';

export default combineReducers({
  errors: errorReducer,
  ingredient: ingredientReducer,
  food: foodReducer
});