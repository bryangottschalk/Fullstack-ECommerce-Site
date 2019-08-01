import axios from 'axios';

const POST_REVIEW = 'POST_REVIEW';

//action creators

const postReview = formSubmission => ({
  type: POST_REVIEW,
  formSubmission
});

// thunk creators

export const postReviewThunk = formSubmission => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/reviews', formSubmission);
      dispatch(postReview(data));
    } catch (err) {
      console.log('error adding review', err);
    }
  };
};

const initialState = [];

const productReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
};

export default productReviewsReducer;
