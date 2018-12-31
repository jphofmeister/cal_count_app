import axios from 'axios';

import {
  //ADD_FOOD,
  EDIT_FOOD,
  GET_FOOD,
  GET_FOODS,
  DELETE_FOOD,
  FOOD_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

//add food
export const addFood = (foodData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('api/food', foodData)
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

//edit food
export const editFood = (id, updatedFood, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/food/${id}`, updatedFood)
    .then(res =>
      dispatch({
        type: EDIT_FOOD,
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

//get foods
export const getFoods = () => dispatch => {
  dispatch(setFoodLoading());
  axios
    .get('/api/food')
    .then(res =>
      dispatch({
        type: GET_FOODS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FOODS,
        payload: null
      })
    );
}

//get food
export const getFood = id => dispatch => {
  dispatch(setFoodLoading());
  axios
    .get(`/api/food/${id}`)
    .then(res =>
      dispatch({
        type: GET_FOOD,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FOOD,
        payload: null
      })
    );
}

//delete food
export const deleteFood = id => dispatch => {
  axios
    .delete(`/api/food/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_FOOD,
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
export const setFoodLoading = () => {
  return {
    type: FOOD_LOADING
  }
}

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};