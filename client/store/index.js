import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import player from './player';
import game from './game';


const reducer = combineReducers({ player, game });

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));
const store = createStore(reducer, middleware);

export default store;
export * from './player';
export * from './game';

