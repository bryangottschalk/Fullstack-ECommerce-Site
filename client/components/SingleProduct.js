import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';
import ListReviews from './ListReviews';
import { postReviewThunk } from '../store/reviews';
import { getSingleProductThunk } from '../store/singleProduct';
import { Rating } from 'semantic-ui-react';

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(evt, formState) {
    evt.preventDefault();
    this.props.postReview(
      formState,
      this.props.match.params.id,
      `/products/${this.props.match.params.id}`
    );
  }

  render() {
    const { product } = this.props;
    const oldReviews = product.reviews;
    const newReviews = this.props.reviews;
    console.log('PROPS', this.props);
    return (
      <div>
        <img src={product.imageUrl} />
        <h1>{product.name}</h1>
        <div>
          RATING:
          {product.avgStar !== null ? (
            <Rating
              icon="star"
              defaultRating={Math.floor(1 + Math.random() * 5)}
              maxRating={5}
              size="huge"
              disabled
            />
          ) : (
            'N/A'
          )}{' '}
          {product.avgStar}
        </div>
        <h3>{`$${product.price}`}</h3>
        <h3>{product.description}</h3>

        <button
          className="addToCart"
          // onClick={() => addToCart()}
          type="button"
        >
          Add To Cart
        </button>
        <ReviewForm
          productId={product.id}
          handleFormSubmit={this.handleFormSubmit}
        />
        <ListReviews oldReviews={oldReviews} newReviews={newReviews} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProductReducer,
    reviews: state.productReviewsReducer
  };
};

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getSingleProductThunk(productId)),
  postReview: (formSubmission, productId, redirectPath) =>
    dispatch(postReviewThunk(formSubmission, productId, redirectPath))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
