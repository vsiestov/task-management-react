import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as fromUsers from './users'
import * as fromTasks  from './tasks';

const reducers = combineReducers({
  app: fromUsers.usersReducer,
  tasks: fromTasks.tasksReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

