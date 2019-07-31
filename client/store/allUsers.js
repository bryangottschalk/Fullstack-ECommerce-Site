import axios from 'axios';
import history from '../history';

const GET_ALL_USERS = 'GET_ALL_USERS';
const DELETE_USER = 'DELETE_USER';

const initialState = [];

const getAllUsers = users => ({ type: GET_ALL_USERS, users });
const deleteUser = userId => ({ type: DELETE_USER, userId });

export const getAllUsersThunk = () => {
  return async dispatch => {
    const response = await axios.get('/api/users');
    const allUsers = response.data;
    const action = getAllUsers(allUsers);
    dispatch(action);
  };
};

export const deleteUserThunk = (userId, redirectPath) => {
  return async dispatch => {
    try {
      const { status } = await axios.delete(`/api/users/${userId}`);
      if (status === 202) {
        const action = deleteUser(userId);
        dispatch(action);
        history.push(redirectPath);
      }
    } catch (error) {
      console.log('Error deleting the user');
    }
  };
};

export const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    case DELETE_USER:
      return [...state.filter(user => user.id !== action.userId)];
    default:
      return state;
  }
};

export default allUsersReducer;
