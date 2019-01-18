import axios from 'axios';

import {
  //ADD_DAY,
  EDIT_DAY,
  GET_DAY,
  GET_DAYS,
  DELETE_DAY,
  DAY_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

//add day
export const addDay = (dayData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('api/day', dayData)
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

//edit day
export const editDay = (id, updatedDay) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/day/${id}`, updatedDay)
    .then(res =>
      dispatch({
        type: EDIT_DAY,
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
// export const getDay = () => dispatch => {
//   dispatch(setDayLoading());
//   axios
//     .get('/api/day')
//     .then(res =>
//       dispatch({
//         type: GET_DAYS,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_DAYS,
//         payload: null
//       })
//     );
// }

//get day
export const getDay = date => dispatch => {
  dispatch(setDayLoading());
  axios
    .get(`/api/day/${date}`)
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