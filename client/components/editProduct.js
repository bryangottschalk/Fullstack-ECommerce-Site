import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './productForm';
import { getSingleProductThunk } from '../store/singleProduct';

class EditProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
  }
  render() {
    const productToEdit = this.props.singleProduct;
    return (
      <div>
        <h2>Edit product</h2>
        <ProductForm type="edit" product={productToEdit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProductReducer
  };
};
const mapDispatchToProps = dispatch => ({
  getSingleProduct: productId => dispatch(getSingleProductThunk(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
