const SET_USER_STATUS = 'SET_USER_STATUS';
const SET_ADMIN_STATUS = 'SET_ADMIN_STATUS';

export const setUserStatus = bool => ({
  type: SET_USER_STATUS,
  bool
});

export const setAdminStatus = bool => ({
  type: SET_ADMIN_STATUS,
  bool
});

const initialState = {
  isAdmin: false,
  isLoggedIn: false
};

const typeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_STATUS:
      return { ...state, isLoggedIn: action.bool };
    case SET_ADMIN_STATUS:
      return { ...state, isAdmin: action.bool };
    default:
      return state;
  }
};

export default typeReducer;
