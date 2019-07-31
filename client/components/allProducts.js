import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllProductsThunk } from '../store/allProducts';
//import remote product thunk?

export class allProducts extends React.Component {
  async componentDidMount() {
    await this.props.fetchProducts();
  }

  render() {
    const products = this.props.products;
    console.log('products', this.props);
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
                <button type="button" className="addToCart">
                  QUICK ADD
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
  products: state.allProductsReducer
});

const mapDispatchToProps = dispatch => ({
  // removeProduct: productId => dipsatch(removeProductThunk(productId))
  fetchProducts: () => dispatch(getAllProductsThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(allProducts);
