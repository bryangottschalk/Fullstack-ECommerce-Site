import axios from 'axios';

//Action constants
const GET_PAST_ORDERS = 'GET_PAST_ORDERS';
const GET_ALL_ORDERS = 'GET_ALL_ORDERS';

//Action creators
const getPastOrders = orders => ({
  type: GET_PAST_ORDERS,
  orders
});

const getAllOrders = orders => ({
  type: GET_ALL_ORDERS,
  orders
});

//Thunk creators
export const getPastOrdersThunk = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/pastOrders');
    dispatch(getPastOrders(data));
  };
};

export const getAllOrdersThunk = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/orders/all');
    dispatch(getAllOrders(data));
  };
};

const pastOrdersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders;
    case GET_PAST_ORDERS:
      return action.orders;
    default:
      return state;
  }
};

export default pastOrdersReducer;
