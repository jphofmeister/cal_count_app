import {
  ADD_INGREDIENT,
  EDIT_INGREDIENT,
  GET_INGREDIENT,
  GET_INGREDIENTS,
  DELETE_INGREDIENT,
  INGREDIENT_LOADING
} from './types';

const initialState = {
  ingredients: [],
  ingredient: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INGREDIENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [action.payload, ...state.ingredients]
      };
    case EDIT_INGREDIENT:
      return {
        ...state,
        ingredient: action.payload
      };
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
        loading: false
      };
    case GET_INGREDIENT:
      return {
        ...state,
        ingredient: action.payload,
        loading: false
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient._id !== action.payload)
      }
    default:
      return state;
  }
}