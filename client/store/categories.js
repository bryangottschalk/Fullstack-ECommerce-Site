import axios from 'axios';

//ACTION CONSTANTS
const GET_CATEGORIES = 'GET_ALL_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY';

//ACTION CREATORS
const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

const addCategory = category => ({
  type: ADD_CATEGORY,
  category
});

//THUNK CREATORS
export const getCategoriesThunk = () => {
  return async dispatch => {
    const { data } = await axios.get(`/api/categories`);
    dispatch(getCategories(data));
  };
};

//REDUCER

export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
      return [...state, action.category];
    default:
      return state;
  }
};

export default categoriesReducer;
