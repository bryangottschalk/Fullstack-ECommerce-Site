import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  getAllProductsThunk,
  deleteProduct,
  addProduct
} from '../store/allProducts';
import { addToCartThunk, setCartIdThunk } from '../store/cart';
import { Button } from 'semantic-ui-react';
//import remote product thunk?

export class allProducts extends React.Component {
  constructor() {
    super();

    this.addProduct = this.addProduct.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchProducts();
  }

  async addProduct(product) {
    if (this.props.cart.id === 0) {
      await this.props.setCartId(this.props.user.id);
      console.log('this.propsasjdkf;a&&&&&&&&&&&&&&', this.props.cart);
    }
    await this.props.quickAdd(product, this.props.cart.id);
  }

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
                  onClick={() => this.addProduct(product)}
                >
                  QUICK ADD
                </Button>
                <button
                  type="button"
                  onClick={() => this.props.deleteProduct(product.id)}
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
  deleteProduct: productId => dispatch(deleteProduct(productId)),
  quickAdd: (item, order) => dispatch(addToCartThunk(item, order)),
  setCartId: userId => dispatch(setCartIdThunk(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(allProducts);
