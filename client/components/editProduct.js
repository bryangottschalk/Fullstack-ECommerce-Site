import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './productForm';
import { getSingleProductThunk } from '../store/singleProduct';
import { Form, Message, Container, Input } from 'semantic-ui-react';
class EditProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
  }
  render() {
    const productToEdit = this.props.singleProduct;
    return (
      <Container center>
        <h2>Edit product</h2>
        <ProductForm type="edit" product={productToEdit} />
      </Container>
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
