import axios from 'axios';

// action types
const GET_SINGLE_USER = 'GET_SINGLE_USER';

//action creators
export const getSingleUser = user => {
  return {
    type: GET_SINGLE_USER,
    user
  };
};

//thunks
export const getSingleUserThunk = (userId, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      const action = getSingleUser(data);
      dispatch(action);
    } catch (error) {
      if (error.response.status === 404) {
        history.push('/404');
      } else if (error.response.status === 500) {
        history.push('/500');
      } else {
        console.log('Error getting a single user', error);
      }
    }
  };
};

//reducer
const initialState = { users: [] };

export const singleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
};

export default singleUserReducer;
