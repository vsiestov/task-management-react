import * as types from '../types';

const initialState = [
];

export function tasksReducer(state = initialState, action) {
  switch (action.type) {
  case types.RESPONSE_LIST:
    return action.payload;

  case types.RESPONSE_UPDATE:
    const { payload } = action;
    return state.map((item) => {
      if (item._id === payload._id) {
        return payload;
      }

      return item;
    });

  case types.RESPONSE_CREATE:
    return [...state, action.payload];

  case types.RESPONSE_DELETE:
    const { _id } = action.payload;

    return state.filter((item) => {
      return item._id !== _id;
    });

  default:
    return state;
  }
}
