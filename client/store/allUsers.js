import axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS';

const initialState = [];

const getAllUsers = users => ({ type: GET_ALL_USERS, users });

export const getAllUsersThunk = () => {
  return async dispatch => {
    const response = await axios.get('/api/users');
    const allUsers = response.data;
    const action = getAllUsers(allUsers);
    dispatch(action);
  };
};

export const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
};

export default allUsersReducer;
