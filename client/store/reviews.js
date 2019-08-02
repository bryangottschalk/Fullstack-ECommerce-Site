import axios from 'axios';
import history from '../history';

const POST_REVIEW = 'POST_REVIEW';

//action creators

const postReview = formSubmission => ({
  type: POST_REVIEW,
  formSubmission
});

// thunk creators

export const postReviewThunk = (formSubmission, productId, redirectPath) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/reviews', {
        ...formSubmission,
        productId: productId
      });
      console.log('TCL: postReviewThunk -> data', data);
      dispatch(postReview(data));
      history.push(redirectPath);
    } catch (err) {
      console.log('error adding review', err);
    }
  };
};

const initialState = [];

const productReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REVIEW:
      // const { content, star, productId, userId } = action.formSubmission;
      return [...state, action.formSubmission];
    default:
      return state;
  }
};

export default productReviewsReducer;
