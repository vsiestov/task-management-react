import * as types from '../types';

const initialState = {
  loading: false,
  auth: {
    status: false,
    token: null,
    pending: !!localStorage.getItem('token')
  },
  user: null,
  errors: []
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
  case types.SIGN_IN_RESPONSE:

    const { token, ...user } = action.payload;

    return {
      ...state,
      auth: {
        status: true,
        token: token,
        pending: false
      },
      user: user
    };

  case types.LOGOUT:
    return {
      ...state,
      auth: {
        status: false,
        token: null,
        pending: false
      },
      user: null
    };

  case types.CATCH_ERROR:
    return {
      ...state,
      errors: action.payload
    };

  case types.HIDE_NOTIFICATION:
    return {
      ...state,
      errors: []
    };

  case types.LOADING:
    return {
      ...state,
      loading: true
    };

  case types.HIDE_LOADING:
    return {
      ...state,
      loading: false
    };

  default:
    return state;
  }
}
