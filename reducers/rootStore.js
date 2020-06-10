import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import beerReducer from './beerReducers';
import authReducer from './authReducers';
import wishlistReducer from './wishlistReducers';

const reducer = combineReducers({
  beerReducer,
  authReducer,
  wishlistReducer,
});

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore);

const store = finalCreateStore(reducer);

export default store;
