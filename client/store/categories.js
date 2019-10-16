import axios from 'axios';

//ACTION CONSTANTS
const GET_CATEGORIES = 'GET_ALL_CATEGORIES';

//ACTION CREATORS
const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

//THUNK CREATORS
export const getCategoriesThunk = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/categories');
    dispatch(getCategories(data));
  };
};

//REDUCER

export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export default categoriesReducer;
