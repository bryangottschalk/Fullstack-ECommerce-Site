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

const deleteFromCart = productOrderId => ({
  type: DELETE_FROM_CART,
  productOrderId
});

const updateCart = item => ({
  type: UPDATE_CART,
  item
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

        console.log('Your cart Id is:   ', data[0].id);

        dispatch(setCartId(data[0].id));
      } else {
        const { data } = await axios.get(`/api/orders/?userId=${userId}`);

        console.log('Your cart Id is:   ', data[0].id);

        dispatch(setCartId(data[0].id));
      }
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
        ...state,
        items: state.items.filter(item => item.id !== action.productOrderId)
      };
    case UPDATE_CART:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== action.item.id) {
            return item;
          } else {
            return action.item;
          }
        })
      };

    default:
      return state;
  }
};

export default cartReducer;
