import * as types from "../store/users/types";

const NOTIFICATION_TIME = 3 * 1000;
let exceptionTimeout;

export const handleException = (dispatch, $exception) => {
  dispatch({
    type: types.CATCH_ERROR,
    payload: $exception.errors ?
      $exception.errors :
      $exception.response && $exception.response.data.errors
  });

  clearTimeout(exceptionTimeout);

  exceptionTimeout = setTimeout(() => {
    dispatch({
      type: types.CATCH_ERROR,
      payload: []
    });
  }, NOTIFICATION_TIME);
};
