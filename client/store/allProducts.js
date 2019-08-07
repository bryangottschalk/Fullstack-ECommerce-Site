import axios from 'axios';
import history from '../history';

//ACTION CONSTANTS
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const GET_CATEGORY_INFO = 'GET_CATEGORY_NAME';
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';

//ACTION CREATORS
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
});

const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
});

const getCategoryInfo = categoryInfo => ({
  type: GET_CATEGORY_INFO,
  categoryInfo
});

const getAllCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
});

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
});

const editProduct = product => {
  return {
    type: EDIT_PRODUCT,
    product
  };
};
//THUNK CREATORS
export const getAllProductsThunk = filterTag => {
  return async dispatch => {
    try {
      if (filterTag[0] === '1') {
        const response = await axios.get(
          `/api/products?categoryTag=${filterTag.substring(1)}`
        );
        const filteredProducts = response.data;
        dispatch(getAllProducts(filteredProducts));
        history.push(`/products?categoryTag=${filterTag}`);
      } else if (filterTag[0] === '2') {
        const searchTag = filterTag.substring(1).trim();
        const response = await axios.get(
          `/api/products?searchTag=${searchTag}`
        );
        const searchedProducts = response.data;
        dispatch(getAllProducts(searchedProducts));
        history.push(`/products?searchTag=${searchTag}`);
      } else {
        const response = await axios.get(`/api/products`);
        const allProducts = response.data;
        dispatch(getAllProducts(allProducts));
        history.push('/products/');
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllCategoriesThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/categories');
      dispatch(getAllCategories(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getCategoryInfoThunk = filterTag => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/products${filterTag}`);
      const { id, name } = response.data;
      dispatch(getCategoryInfo({ id, name }));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteProductThunk = productId => {
  return async dispatch => {
    try {
      const { status } = await axios.delete(`/api/products/${productId}`);
      if (status === 202) {
        const action = deleteProduct(productId);
        dispatch(action);
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addProductThunk = product => {
  return async dispatch => {
    try {
      await axios.post('/api/products', product);
      dispatch(addProduct(product));
    } catch (error) {
      console.error(error);
    }
  };
};

export const editProductThunk = product => {
  return async dispatch => {
    try {
      console.log('INSIDE EDIT PRODUCT THUNK');
      console.log('PRODUCT ID', product.id);
      const { data } = await axios.put(`/api/products/${product.id}`, product);
      dispatch(editProduct(data));
    } catch (error) {
      console.error(error);
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

//const initialState = [];
const initialState = { categoryInfo: {}, products: [], categories: [] };

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.products };
    case GET_ALL_CATEGORIES:
      return { ...state, categories: action.categories };
    case GET_CATEGORY_INFO:
      return { ...state, categoryInfo: action.categoryInfo };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.product] };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        )
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.product.id) {
            return action.product;
          } else {
            return product;
          }
        })
      };
    default:
      return state;
  }
};

export default allProductsReducer;
