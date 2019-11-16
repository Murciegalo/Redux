import { 
  GET_LOGS , 
  SET_LOADING , 
  LOGS_ERROR , 
  ADD_LOGS , 
  DELETE_LOGS, 
  SET_CURRENT , 
  CLEAR_CURRENT,
  UPDATE_LOGS } from './types';

//GET
export const getLogs = () => async dispatch => {
  try {
    const res = await fetch('/logs');   
    const data = await res.json();
    setLoading();
    dispatch({
      type: GET_LOGS ,
      payload: data
    });
  } 
  catch (error) 
  {
    dispatch({
      type: LOGS_ERROR ,
      payload: error.response.data
    });
  }    
}

export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}
//ADD
export const addLogs = (data) => async dispatch => {
  try {
    setLoading();
    //post
    const req = await fetch('/logs' , {
      method : 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    });
    
    const res = await req.json();

    dispatch({
      type: ADD_LOGS ,
      payload: res
    });

  } catch (error) 
  {
    dispatch({
      type: LOGS_ERROR ,
      payload: error.data.response
    });
  }
}

//DELETE
export const deleteLogs = (id) => async dispatch => {
  try {
    setLoading();
    await fetch(`/logs/${id}` , { method: 'DELETE' });
    
    dispatch({
      type: DELETE_LOGS ,
      payload: id
    });
  } 
  catch (error) {
    dispatch({
      type: LOGS_ERROR ,
      payload: error.data.response
    });
  }
}

//CURRENT Item
export const setCurrent = log => {
  return {
    type: SET_CURRENT ,
    payload: log
  }
}
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT 
  }
}

//UPDATE
export const updateLogs = (log) => async dispatch => {
  try {
    setLoading();
    const req = await fetch(`/logs/${log.id}` , { 
      method: 'PUT' ,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(log)
    });
    
    const data = await req.json();
    
    dispatch({
      type: UPDATE_LOGS ,
      payload: data
    });
  } 
  catch (error) {
    dispatch({
      type: LOGS_ERROR ,
      payload: error.data.response
    });
  }
}