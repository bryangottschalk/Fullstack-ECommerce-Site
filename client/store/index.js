import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import allProductsReducer from './allProducts';
import allUsersReducer from './allUsers';
import { singleProductReducer as singleProduct } from './singleProduct';

const reducer = combineReducers({
  user,
  allProductsReducer,
  allUsersReducer,
  singleProduct
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
