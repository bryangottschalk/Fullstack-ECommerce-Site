import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllProductsThunk, deleteProductThunk } from '../store/allProducts';
import { addToCartThunk, setCartIdThunk } from '../store/cart';
import { Button } from 'semantic-ui-react';
//import remote product thunk?

export class allProducts extends React.Component {
  async componentDidMount() {
    await this.props.fetchProducts();
    // await this.props.setCartId(this.props.user.id);
  }

  handleDelete = (event, productId) => {
    event.preventDefault();
    this.props.deleteProduct(productId, '/products');
  };

  render() {
    const products = this.props.products;
    console.log('PROPS', this.props);
    return (
      <div>
        <ul id="UsersList">
          {products.map(product => {
            return (
              <li key={product.id}>
                <NavLink to={`products/${product.id}`}>
                  PRODUCT: {product.name}
                  RATING: {products.rating}
                </NavLink>

                <img className="user-image" src={product.imageUrl} />
                <Button
                  type="button"
                  className="addToCart"
                  onClick={() =>
                    this.props.quickAdd({
                      quantity: 1,
                      unitPrice: product.price,
                      productId: product.id,
                      orderId: this.props.cart.id
                    })
                  }
                >
                  QUICK ADD
                </Button>
                <button
                  type="button"
                  onClick={event => this.handleDelete(event, product.id)}
                >
                  DELETE
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.allProductsReducer,
  user: state.user,
  cart: state.cartReducer
});

const mapDispatchToProps = dispatch => ({
  // removeProduct: productId => dipsatch(removeProductThunk(productId))
  fetchProducts: () => dispatch(getAllProductsThunk()),
  deleteProduct: (productId, redirectPath) =>
    dispatch(deleteProductThunk(productId, redirectPath)),
  quickAdd: item => dispatch(addToCartThunk(item)),
  setCartId: id => dispatch(setCartIdThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(allProducts);
