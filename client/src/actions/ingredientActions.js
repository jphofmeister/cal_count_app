import axios from 'axios';

import {
  //ADD_INGREDIENT,
  EDIT_INGREDIENT,
  GET_INGREDIENT,
  GET_INGREDIENTS,
  DELETE_INGREDIENT,
  INGREDIENT_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

//add ingredient
export const addIngredient = (ingredientData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('api/ingredients', ingredientData)
    .then(res =>
      history.push('/')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//edit ingredient
export const editIngredient = (id, updatedIngredient, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/ingredients/${id}`, updatedIngredient)
    .then(res =>
      dispatch({
        type: EDIT_INGREDIENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//get ingredients
export const getIngredients = () => dispatch => {
  dispatch(setIngredientLoading());
  axios
    .get('/api/ingredients')
    .then(res =>
      dispatch({
        type: GET_INGREDIENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_INGREDIENTS,
        payload: null
      })
    );
}

//get ingredient
export const getIngredient = id => dispatch => {
  dispatch(setIngredientLoading());
  axios
    .get(`/api/ingredients/${id}`)
    .then(res =>
      dispatch({
        type: GET_INGREDIENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_INGREDIENT,
        payload: null
      })
    );
}

//delete ingredient
export const deleteIngredient = (id, history) => dispatch => {
  axios
    .delete(`/api/ingredients/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_INGREDIENT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//set loading state
export const setIngredientLoading = () => {
  return {
    type: INGREDIENT_LOADING
  }
}

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};