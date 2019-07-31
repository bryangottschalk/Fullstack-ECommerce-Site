import axios from 'axios';
import history from '../history';

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
});

const initialState = [];

export const getAllProductsThunk = () => {
  return async dispatch => {
    const response = await axios.get('/api/products');
    console.log('res', response);
    const allProducts = response.data;
    const action = getAllProducts(allProducts);
    dispatch(action);
  };
};

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default allProductsReducer;
