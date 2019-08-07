import axios from 'axios';
import history from '../history';

const SET_CART_ID = 'SET_CART_ID';
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';

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

const deleteFromCart = productOrderId => ({
  type: DELETE_FROM_CART,
  productOrderId
});

// Use rest-ful way of getting the order
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

// Use rest-ful way of getting the order
export const setCartIdThunk = userId => {
  return async dispatch => {
    try {
      if (userId === '') {
        // console.log('userID is undefined!!!!!');
        const { data } = await axios.get(`/api/orders/?userId=${undefined}`);

        // console.log('Your cart Id is:   ', data[0].id);

        dispatch(setCartId(data[0].id));
      } else {
        const { data } = await axios.get(`/api/orders/?userId=${userId}`);

        // console.log('Your cart Id is:   ', data[0].id);

        dispatch(setCartId(data[0].id));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const checkoutThunk = async (token, total) => {
  try {
    const checkedout = await axios.post('/api/checkout', { token, total });
    console.log('CHECKK&#^($*#($&&&&&&', checkedout);
    const { status } = checkedout.data;
    return status;
  } catch (error) {
    console.error(error);
  }
};

export const addToCartThunk = item => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/productOrders', item);
      dispatch(addToCart(data));
      console.log('stuff got back from res: ', data);
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFromCartThunk = productOrderId => {
  return async dispatch => {
    try {
      const { status } = await axios.delete(
        `/api/productOrders/${productOrderId}`
      );
      if (status === 202) {
        const action = deleteFromCart(productOrderId);
        dispatch(action);
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const initialCart = {
  id: null,
  items: []
};

const cartReducer = (state = initialCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [
          ...state.items.filter(item => item.id !== action.item.id),
          action.item
        ]
      };
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
        ...state,
        items: state.items.filter(item => item.id !== action.productOrderId)
      };
    default:
      return state;
  }
};

export default cartReducer;
