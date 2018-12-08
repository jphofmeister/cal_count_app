import {
  ADD_FOOD,
  EDIT_FOOD,
  GET_FOOD,
  GET_FOODS,
  DELETE_FOOD,
  FOOD_LOADING
} from '../actions/types';

const initialState = {
  foods: [],
  food: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FOOD_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_FOOD:
      return {
        ...state,
        food: [action.payload, ...state.food]
      };
    case EDIT_FOOD:
      return {
        ...state,
        food: action.payload
      };
    case GET_FOODS:
      return {
        ...state,
        foods: action.payload,
        loading: false
      };
    case GET_FOOD:
      return {
        ...state,
        food: action.payload,
        loading: false
      };
    case DELETE_FOOD:
      return {
        ...state,
        foods: state.foods.filter(food => food._id !== action.payload)
      }
    default:
      return state;
  }
}