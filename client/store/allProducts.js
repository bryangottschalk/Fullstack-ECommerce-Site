import axios from 'axios';
import history from '../history';

//ACTION CONSTANTS
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';

//ACTION CREATORS
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
});

const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
});

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
});

//THUNK CREATORS
export const getAllProductsThunk = () => {
  return async dispatch => {
    const response = await axios.get('/api/products');
    const allProducts = response.data;
    const action = getAllProducts(allProducts);
    dispatch(action);
  };
};

export const deleteProductThunk = (productId, redirectpath) => {
  return async dispatch => {
    try {
      const { status } = await axios.delete(`/api/products/${productId}`);
      if (status === 202) {
        const action = deleteProduct(productId);
        dispatch(action);
        history.push(redirectpath);
      }
    } catch (error) {
      console.log('Error deleting the product');
    }
  };
};

// export const addProductThunk = (product) => {
//   return async dispatch => {
//     try {
//       await axios.post('/api/products')
//     }
//   }
// }

const initialState = [];

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return [...state.filter(product => product.id !== action.productId)];
    default:
      return state;
  }
};

export default allProductsReducer;
