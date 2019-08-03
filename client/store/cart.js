import axios from 'axios';
import history from '../history';

const SET_CART_ID = 'SET_CART_ID';
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const UPDATE_CART = 'UPDATE_CART';

const setCartId = id => ({
  type: SET_CART_ID,
  id
});

const getCart = cart => ({
  type: GET_CART,
  cart
});

export const addToCart = item => ({
  type: ADD_TO_CART,
  item
});

const deleteFromCart = (orderId, productId) => ({
  type: DELETE_FROM_CART,
  orderId,
  productId
});

const updateCart = item => ({
  type: UPDATE_CART,
  item
});

export const getCartThunk = cartId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/productOrders?orderId=${cartId}`);
      const action = getCart(data);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setCartIdThunk = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/orders/?userId=${userId}`);
      dispatch(setCartId(data[0].id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCartThunk = item => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/productOrders', item);
      dispatch(addToCart(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFromCartThunk = (orderId, productId, redirectPath) => {
  return async dispatch => {
    try {
      const { status } = await axios.delete(
        `/api/productOrders?orderId=${orderId}&productId=${productId}`
      );
      if (status === 202) {
        const action = deleteFromCart(orderId, productId);
        dispatch(action);
        history.push(redirectPath);
      }
    } catch (error) {
      console.log('Error deleting a student', error);
    }
  };
};

export const updateCartThunk = item => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/api/productOrders?orderId=${item.orderId}&productId=${
          item.productId
        }`,
        item
      );
      const action = updateCart(data);
      dispatch(action);
      history.push(`/students/${data.id}`);
    } catch (error) {
      console.log('Error updating a student', error);
    }
  };
};

const initialCart = {
  id: 0,
  items: []
};

const cartReducer = (state = initialCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('adding to cart');
      return { ...state, items: [...state.items, action.item] };
    case SET_CART_ID:
      return {
        ...state,
        id: action.id
      };
    case GET_CART:
      return {
        ...state,
        items: action.cart
      };
    case DELETE_FROM_CART:
      return {
        ...state.filter(
          (order, product) =>
            order.id !== action.orderId && product.id !== action.productId
        )
      };
    case UPDATE_CART:
      return {
        ...state.map(item => {
          if (item.id !== action.item.id) {
            return item;
          } else {
            return action.item;
          }
        })
      };

    default:
      console.log('inside default');
      return state;
  }
};

export default cartReducer;
