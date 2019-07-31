import React from 'react';
import { connect } from 'react-redux';
import { getSingleProductThunk } from '../store/singleProduct';

class SingleProduct extends React.Component {
  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.id);
  }
  render() {
    const { product } = this.props;
    return (
      <div>
        <img src="http://placekitten.com/500/500" />
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct
  };
};

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getSingleProductThunk(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
