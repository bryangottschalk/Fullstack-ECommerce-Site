import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {
  getAllProductsThunk,
  deleteProductThunk,
  getCategoryInfoThunk,
  getAllCategoriesThunk
} from '../store/allProducts';
import { addToCartThunk, setCartIdThunk } from '../store/cart';
import {
  Button,
  Card,
  Image,
  Rating,
  Icon,
  Grid,
  Label,
  Form,
  Modal,
  Header,
  Input
} from 'semantic-ui-react';

export class allProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      category: null,
      search: '',
      searching: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchProducts(this.props.location.search);
    await this.props.getCategoryInfo(this.props.location.search);
    await this.props.fetchCategories();
  }

  handleDelete = (event, productId) => {
    event.preventDefault();
    this.props.deleteProduct(productId);
  };

  handleClick(categoryName) {
    if (categoryName === '') {
      this.setState({
        category: null
      });
    } else {
      this.setState({
        category: categoryName
      });
    }
    this.props.fetchProducts(`1${categoryName}`);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchProducts(`2${this.state.search}`);
    this.setState({
      searching: true
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.value === '') {
      this.setState({
        searching: false
      });
    }
  }

  async addProduct(product) {
    await this.props.setCartId(this.props.user.id);
    await this.props.quickAdd({
      quantity: 1,
      unitPrice: product.price,
      productId: product.id,
      orderId: this.props.cart.id,
      productName: product.name,
      imageUrl: product.imageUrl
    });
  }

  render() {
    const products = this.props.products;
    const categories = this.props.allCategories;
    return (
      <div>
        {!this.state.category ? (
          <div style={{ marginBottom: '10px' }}>
            {categories.map(category => (
              <Label
                style={{ cursor: 'pointer' }}
                key={category.id}
                color="teal"
                tag
                size="large"
                onClick={() => this.handleClick(category.name)}
              >
                {category.name}
              </Label>
            ))}
          </div>
        ) : (
          <div style={{ marginBottom: '10px' }}>
            Filter:{' '}
            <Label
              color="orange"
              tag
              size="large"
              style={{ cursor: 'pointer' }}
              onClick={() => this.handleClick('')}
            >
              {this.state.category}
            </Label>
          </div>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Input
              onChange={this.handleChange}
              name="search"
              type="text"
              placeholder="Search..."
              value={this.state.search}
            />
            <Button size="mini" type="submit">
              Search
            </Button>
          </Form.Field>
        </Form>

        <Card.Group itemsPerRow={5}>
          {products &&
            products.map(product => {
              return (
                <Card color="teal" key={product.id} id="ProductsList">
                  <Card.Content>
                    <NavLink to={`/products/${product.id}`}>
                      <Image src={product.imageUrl} />
                      <Card.Header>{product.name} </Card.Header>
                    </NavLink>
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
                        <Modal
                          trigger={
                            <Button
                              color="teal"
                              animated="vertical"
                              className="addToCart"
                              onClick={() => this.addProduct(product)}
                            >
                              <Button.Content hidden>Add</Button.Content>
                              <Button.Content visible>
                                <Icon name="shop" />
                              </Button.Content>
                            </Button>
                          }
                          basic
                          size="small"
                        >
                          <Header
                            icon="shopping cart"
                            content="Added To Your Cart!!"
                          />
                          <Modal.Content>
                            <p>very cool.</p>
                          </Modal.Content>
                        </Modal>
                      </Grid.Column>
                      <Grid.Column>
                        {this.props.isAdmin && (
                          <Button
                            content="Delete"
                            negative
                            onClick={event =>
                              this.handleDelete(event, product.id)
                            }
                          />
                        )}
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
  products: state.allProductsReducer.products,
  user: state.user,
  cart: state.cartReducer,
  category: state.allProductsReducer.categoryInfo,
  allCategories: state.allProductsReducer.categories,
  isAdmin: state.user.isAdmin
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: filterTag => dispatch(getAllProductsThunk(filterTag || '')),
  deleteProduct: productId => dispatch(deleteProductThunk(productId)),
  quickAdd: item => dispatch(addToCartThunk(item)),
  setCartId: id => dispatch(setCartIdThunk(id || '')),
  getCategoryInfo: category => dispatch(getCategoryInfoThunk(category)),
  fetchCategories: () => dispatch(getAllCategoriesThunk())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(allProducts)
);
