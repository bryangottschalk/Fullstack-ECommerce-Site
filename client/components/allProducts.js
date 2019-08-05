import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { getAllProductsThunk, deleteProductThunk } from '../store/allProducts';
import { addToCartThunk, setCartIdThunk } from '../store/cart';
import {
  Button,
  Card,
  Image,
  Rating,
  Icon,
  Grid,
  Dropdown,
  Header
} from 'semantic-ui-react';

export class allProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      category: null
    };

    this.addProduct = this.addProduct.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchProducts(this.state.category);
  }

  async addProduct(product) {
    await this.props.quickAdd(product, this.props.cart.id, 1);
  }

  handleDelete = (event, productId) => {
    event.preventDefault();
    this.props.deleteProduct(productId, '/products');
  };

  async handleChange(event, { value }) {
    await this.setState({
      category: value
    });
    this.props.fetchProducts(this.state.category);
  }

  render() {
    console.log('PROPS', this.props);
    const products = this.props.products;
    const categoryOptions = [
      {
        key: 'Dog',
        text: 'Dog',
        value: 'Dog'
      },
      {
        key: 'Cat',
        text: 'Cat',
        value: 'Cat'
      },
      {
        key: 'Reptile',
        text: 'Reptile',
        value: 'Reptile'
      },
      {
        key: 'Small Pet',
        text: 'Small Pet',
        value: 'Small Pet'
      },
      {
        key: 'Supplies',
        text: 'Supplies',
        value: 'Supplies'
      },
      {
        key: 'Food',
        text: 'Food',
        value: 'Food'
      }
    ];
    return (
      <div>
        <Header size="large" textAlign="center">
          All Products
        </Header>
        <Dropdown
          className="categorySelection"
          onChange={this.handleChange}
          placeholder="Category"
          fluid
          selection
          options={categoryOptions}
          value={this.state.category}
        />
        <Card.Group itemsPerRow={4}>
          {products.map(product => {
            return (
              <Card color="teal" key={product.id} id="UsersList">
                <Card.Content>
                  <Image src={product.imageUrl} />

                  <Card.Header>
                    <NavLink
                      className="productTitle"
                      to={`products/${product.id}`}
                    >
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
                    <Grid.Column width={4}>
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
  fetchProducts: category => dispatch(getAllProductsThunk(category)),
  quickAdd: (item, order, quantity) =>
    dispatch(addToCartThunk(item, order, quantity)),
  setCartId: userId => dispatch(setCartIdThunk(userId)),
  deleteProduct: (productId, redirectPath) =>
    dispatch(deleteProductThunk(productId, redirectPath))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(allProducts)
);
