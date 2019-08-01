import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllProductsThunk, deleteProductThunk } from '../store/allProducts';
import { addToCartThunk, setCartIdThunk } from '../store/cart';
import { Card, Image, Button } from 'semantic-ui-react';

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
    return (
      <div>
        <Card.Group itemsPerRow={6}>
          {products.map(product => {
            return (
              <Card key={product.id} id="UsersList">
                <Card.Content>
                  <Image src={product.imageUrl} />
                  <Card.Header>
                    <NavLink to={`products/${product.id}`}>
                      {product.name}
                    </NavLink>
                  </Card.Header>
                  <Card.Meta>RATING: {products.rating}</Card.Meta>
                  <button
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
                  </button>
                  <button
                    type="button"
                    onClick={() => this.props.deleteProduct(product.id)}
                  >
                    DELETE
                  </button>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
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
