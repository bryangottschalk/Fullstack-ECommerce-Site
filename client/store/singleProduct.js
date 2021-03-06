import axios from 'axios';
import history from '../history';

// action types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

//action creators
export const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  };
};

//thunks
export const getSingleProductThunk = productId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      const action = getSingleProduct(data);
      dispatch(action);
    } catch (error) {
      if (error.response.status === 404) {
        history.push('/404');
      } else if (error.response.status === 500) {
        history.push('/500');
      } else {
        console.log('Error getting a single product', error);
      }
    }
  };
};

//reducer
const initialState = {};
export const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export default singleProductReducer;
