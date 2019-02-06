import axios from 'axios';

import {
  ADD_DAY,
  //EDIT_DAY,
  GET_DAY,
  GET_DAYS,
  DELETE_DAY,
  DAY_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

//add day
export const addDay = dayData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('api/day', dayData)
    // .then(res =>
    //   history.push('/')
    // )
    .then(res =>
      dispatch({
        type: ADD_DAY,
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

//get days
export const getDays = () => dispatch => {
  dispatch(setDayLoading());
  axios
    .get('/api/day')
    .then(res =>
      dispatch({
        type: GET_DAYS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DAYS,
        payload: null
      })
    );
}

//get day
export const getDay = newDate => dispatch => {
  dispatch(setDayLoading());
  axios
    .get('/api/day/date', { params: { date: newDate } })
    .then(res =>
      dispatch({
        type: GET_DAY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DAY,
        payload: null
      })
    );
}

//delete day
export const deleteDay = id => dispatch => {
  axios
    .delete(`/api/day/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_DAY,
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

//delete food item from day
export const deleteFoodFromDay = (date, food_id) => dispatch => {
  axios
    .delete('/api/day/date/food', { params: { date: date, food_id: food_id } })
    .then(res => dispatch(getDay(date)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

//set loading state
export const setDayLoading = () => {
  return {
    type: DAY_LOADING
  }
}

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};