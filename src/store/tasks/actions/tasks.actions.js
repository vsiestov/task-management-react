import * as usersTypes from '../../users/types';
import * as tasksTypes from "../types";
import * as tasks from "../../../providers/tasks.provider";
import { handleException } from "../../../helpers/handlers";

export const list = () => {
  return async (dispatch) => {
    dispatch({
      type: usersTypes.LOADING
    });

    try {
      const response = await tasks.getList();

      dispatch({
        type: tasksTypes.RESPONSE_LIST,
        payload: response
      });

    } catch ($exception) {
      handleException(dispatch, $exception);
    } finally {
      dispatch({
        type: usersTypes.HIDE_LOADING
      });
    }
  };
};

export const create = (params) => {
  return async (dispatch) => {
    dispatch({
      type: usersTypes.LOADING
    });

    try {
      const task = await tasks.create(params);

      dispatch({
        type: tasksTypes.RESPONSE_CREATE,
        payload: task
      });

    } catch ($exception) {
      handleException(dispatch, $exception);
    } finally {
      dispatch({
        type: usersTypes.HIDE_LOADING
      });
    }
  };
};

export const update = (id, params) => {
  return async (dispatch) => {
    dispatch({
      type: usersTypes.LOADING
    });

    try {
      const task = await tasks.update(id, params);

      dispatch({
        type: tasksTypes.RESPONSE_UPDATE,
        payload: task
      });

    } catch ($exception) {
      handleException(dispatch, $exception);
    } finally {
      dispatch({
        type: usersTypes.HIDE_LOADING
      });
    }
  };
};

export const remove = (id) => {
  return async (dispatch) => {
    dispatch({
      type: usersTypes.LOADING
    });

    try {
      await tasks.remove(id);

      dispatch({
        type: tasksTypes.RESPONSE_DELETE,
        payload: {
          _id: id
        }
      });

    } catch ($exception) {
      handleException(dispatch, $exception);
    } finally {
      dispatch({
        type: usersTypes.HIDE_LOADING
      });
    }
  };
};
