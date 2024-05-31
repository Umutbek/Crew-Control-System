import {
    USER_SUCCESS,
    USER_LOADING,
    USER_FAIL,
    LOGOUT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_LOADING,
    CLEAR_ERROR,
  } from "../types/authTypes"
  import {ERRORS} from "../../constants/errors"
  
  const _baseApi = process.env.REACT_APP_BASE_API1;

  export const loadUser = () => async (dispatch, getState) => {
    dispatch(userLoading())
  
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getState().auth.token}`,
      }
    }
  
    try {
      const response = await fetch(`${_baseApi}/tenants/get-me/`, options)
    
      console.log("Response", response)
      const data = await response.json()
      console.log("Data", data)

      if (response.ok){
        dispatch(userSuccess(data))
      } else {
        dispatch(userFail(''))
      }
    } catch (e) {
        dispatch(userFail(''))
    }
  
  }
  
  export const login = (email, password, redirectToMainWhenLogin) => async (dispatch, getState) => {
    dispatch(loginLoading())
    
    console.log("Hello")
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password })
      }
  
      console.log("Now I am here")

      const response = await fetch(`${_baseApi}/tenants/login/`, options)
  
      console.log("Response", response)

      const data = await response.json()
  
      console.log("Data", data)

      if (response.ok){
          
        dispatch(loginSuccess(data.data[0], data.token))
        redirectToMainWhenLogin()
      } else {
        dispatch(loginFail(data?.detail[0] || ERRORS.LOGIN_FAIL_ERROR))
      }
    } catch (e) {
      dispatch(loginFail(ERRORS.NETWORK_OR_SYNTAX_ERROR))
    }
  
  }
  
  export const loginLoading = () => ({ type: LOGIN_LOADING })
  export const loginSuccess = (user, token) => ({ type: LOGIN_SUCCESS, payload: {user, token} })
  export const loginFail = error => ({ type: LOGIN_FAIL, payload: error })
  
  export const userLoading = () => ({ type: USER_LOADING })
  export const userSuccess = (user, token) => ({ type: USER_SUCCESS, payload: {user, token} })
  export const userFail = error => ({ type: USER_FAIL, payload: error })
  
  export const logout = () => ({ type: LOGOUT })
  
  export const clearError = () => ({ type: CLEAR_ERROR })