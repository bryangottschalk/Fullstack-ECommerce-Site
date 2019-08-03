import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllProductsThunk, deleteProductThunk } from '../store/allProducts';
import { addToCartThunk, setCartIdThunk } from '../store/cart';
import { Button, Card, Image, Rating, Icon, Grid } from 'semantic-ui-react';

export class allProducts extends React.Component {
  constructor() {
    super();

    this.addProduct = this.addProduct.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchProducts();
    await this.props.setCartId(this.props.user.id);
  }

  async addProduct(product) {
    await this.props.quickAdd(product, this.props.cart.id, 1);
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
              <Card color="teal" key={product.id} id="ProductsList">
                <Card.Content>
                  <Image src={product.imageUrl} />

                  <Card.Header>
                    <NavLink to={`products/${product.id}`}>
                      {product.name}{' '}
                    </NavLink>
                  </Card.Header>

                  <Card.Meta>
                    RATING:{' '}
                    {product.avgStar !== null ? (
                      <Rating
                        icon="star"
                        defaultRating={product.avgStar}
                        maxRating={5}
                        size="large"
                        disabled
                      />
                    ) : (
                      'N/A'
                    )}
                  </Card.Meta>

                  <Grid>
                    <Grid.Column width={6}>
                      <Button
                        color="linkedin"
                        animated="vertical"
                        className="addToCart"
                        onClick={() => this.addProduct(product)}
                      >
                        <Button.Content hidden>Add</Button.Content>
                        <Button.Content visible>
                          <Icon name="shop" />
                        </Button.Content>
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        content="Delete"
                        negative
                        onClick={() => this.props.deleteProduct(product.id)}
                      />
                    </Grid.Column>
                  </Grid>
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
  fetchProducts: () => dispatch(getAllProductsThunk()),
  quickAdd: (item, order, quantity) =>
    dispatch(addToCartThunk(item, order, quantity)),
  setCartId: userId => dispatch(setCartIdThunk(userId)),
  deleteProduct: (productId, redirectPath) =>
    dispatch(deleteProductThunk(productId, redirectPath))
});

export default connect(mapStateToProps, mapDispatchToProps)(allProducts);
