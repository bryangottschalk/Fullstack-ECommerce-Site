import axios from 'axios';

const POST_REVIEW = 'POST_REVIEW';

//action creators

const postReview = reviewInfo => ({
  type: POST_REVIEW,
  reviewInfo
});

// thunk creators

export const postReviewThunk = (
  formSubmission,
  productId,
  userName,
  imageUrl
) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/reviews', {
        ...formSubmission,
        productId: productId,
        userName: userName,
        imageUrl: imageUrl
      });
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
      return [...state, action.reviewInfo];
    default:
      return state;
  }
};

export default productReviewsReducer;
