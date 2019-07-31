import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';

const initialCart = {
  id: 0,
  items: []
};

const addToCart = item => ({
  type: ADD_TO_CART,
  item
});

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
