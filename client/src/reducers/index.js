import { combineReducers } from 'redux';
// import authReducer from './authReducer';
import errorReducer from './errorReducer';
import ingredientReducer from './ingredientReducer';
import foodReducer from './foodReducer';
import dayReducer from './dayReducer';

export default combineReducers({
  errors: errorReducer,
  ingredient: ingredientReducer,
  food: foodReducer,
  day: dayReducer
});