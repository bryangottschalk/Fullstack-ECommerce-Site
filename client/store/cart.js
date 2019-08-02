import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const SET_CART_ID = 'SET_CART_ID';

export const addToCart = item => ({
  type: ADD_TO_CART,
  item
});

const setCartId = id => ({
  type: SET_CART_ID,
  id
});

export const setCartIdThunk = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/orders', {
        status: 'Cart',
        userId: userId
      });
      dispatch(setCartId(data.id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCartThunk = (item, order, quantity) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/productOrders', {
        productId: item.id,
        orderId: order,
        quantity: quantity
      });
      dispatch(addToCart(data));
    } catch (error) {
      console.error(error);
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
    default:
      console.log('inside default');
      return state;
  }
};

export default cartReducer;
