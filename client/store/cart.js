import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const SET_CART_ID = 'SET_CART_ID';

const initialCart = {
  id: 0,
  items: []
};

const addToCart = item => ({
  type: ADD_TO_CART,
  item
});

const setCartId = id => ({
  type: SET_CART_ID,
  id
});

export const setCartIdThunk = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      console.log('DATA', data);
      dispatch(setCartId(data.id));
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

const cartReducer = (state = initialCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.item];
    default:
      return state;
  }
};

export default cartReducer;
