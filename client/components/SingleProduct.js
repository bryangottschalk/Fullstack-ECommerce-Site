import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';
import ListReviews from './ListReviews';

import { getSingleProductThunk } from '../store/singleProduct';

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
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
        <ReviewForm />
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
  getProduct: productId => dispatch(getSingleProductThunk(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
