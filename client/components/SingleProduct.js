import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';
import ListReviews from './ListReviews';
import { postReviewThunk } from '../store/reviews';
import { getSingleProductThunk } from '../store/singleProduct';

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(evt, formState) {
    console.log('HERE', this.props.match.params.id);
    evt.preventDefault();
    this.props.postReview(
      formState,
      this.props.match.params.id,
      `/products/${this.props.match.params.id}`
    );
  }

  render() {
    const { product } = this.props;
    const reviews = product.reviews;
    return (
      <div>
        <img src={product.imageUrl} />
        <h1>{product.name}</h1>
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
        <ListReviews reviews={reviews} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProductReducer
  };
};

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getSingleProductThunk(productId)),
  postReview: (formSubmission, productId, redirectPath) =>
    dispatch(postReviewThunk(formSubmission, productId, redirectPath))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
