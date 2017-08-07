import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers/index';

const loggerMiddleware = createLogger();
export const history = createHistory();
const router = routerMiddleware(history);
const enhancers = compose(
  applyMiddleware(loggerMiddleware, thunk, router),
  (window.devToolsExtension) ? window.devToolsExtension() : f => f,
);
const defaultState = {};
const store = createStore(rootReducer, defaultState, enhancers);

export default store;
