import * as types from '../types';
import * as users from '../../../providers/users.provider';
import { updateHeader } from "../../../providers/global.provider";
import { handleException } from "../../../helpers/handlers";

export const me = (token) => {
  return async (dispatch) => {
    dispatch({
      type: types.LOADING
    });

    try {
      const response = await users.me();

      dispatch({
        type: types.SIGN_IN_RESPONSE,
        payload: {
          ...response,
          token
        }
      });

    } catch ($exception) {
      handleException(dispatch, $exception);
    } finally {
      dispatch({
        type: types.HIDE_LOADING
      });
    }
  };
};


export const signInRequest = (params) => {
  return async (dispatch) => {
    dispatch({
      type: types.LOADING
    });

    try {
      const response = await users.signIn(params);

      updateHeader(response.token);
      localStorage.setItem('token', response.token);

      dispatch({
        type: types.SIGN_IN_RESPONSE,
        payload: response
      });

    } catch ($exception) {
      handleException(dispatch, $exception);
    } finally {
      dispatch({
        type: types.HIDE_LOADING
      });
    }
  };
};

export const signUpRequest = (params) => {
  return async (dispatch) => {
    dispatch({
      type: types.LOADING
    });

    try {
      const response = await users.signUp(params);

      dispatch({
        type: types.SIGN_IN_RESPONSE,
        payload: response
      });

      updateHeader(response.token);
      localStorage.setItem('token', response.token);
    } catch ($exception) {
      handleException(dispatch, $exception);
    } finally {
      dispatch({
        type: types.HIDE_LOADING
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    updateHeader('');

    dispatch({
      type: types.LOGOUT
    });
  };
};

export const error = (params) => {
  return (dispatch) => {
    handleException(dispatch, params);
  }
};
