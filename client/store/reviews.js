import axios from 'axios';

const GET_REVIEWS_FOR_PRODUCT = 'GET_REVIEWS_FOR_PRODUCT';
const POST_REVIEW = 'POST_REVIEW';
//action creators

const getReviewsForProduct = reviews => ({
  type: GET_REVIEWS_FOR_PRODUCT,
  reviews
});

const postReview = formSubmission => ({
  type: POST_REVIEW,
  formSubmission
});

// thunk creators

export const getReviewsForProductThunk = () => {
  return async dispatch => {};
};

export const postReviewThunk = () => {
  return async dispatch => {};
};

const initialState = [];

const productReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_FOR_PRODUCT:
      return action.reviews;
    default:
      return state;
  }
};

export default productReviewsReducer;
