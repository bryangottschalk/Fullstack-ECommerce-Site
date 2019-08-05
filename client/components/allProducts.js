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
  Label
} from 'semantic-ui-react';

export class allProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      category: null
    };
    this.handleClick = this.handleClick.bind(this);
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
    this.setState({
      category: categoryName
    });
    this.props.fetchProducts(`?categoryId=${categoryName}`);
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
    console.log('PROPS  ', this.props);
    console.log('this.props.location.search   ', this.props.location.search);

    const products = this.props.products;
    const categories = this.props.allCategories;
    // const categoryName = this.props.category.name;
    return (
      <div>
        {!this.props.location.search ? (
          <div>
            {categories.map(category => (
              // <NavLink
              //   to={`/products?categoryId=${category.name}`}
              //   key={category.id}
              // >
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
              // </NavLink>
            ))}
          </div>
        ) : (
          <div>
            Filter:{' '}
            <Label
              color="orange"
              tag
              size="large"
              style={{ cursor: 'pointer' }}
              onClick={() => this.handleClick()}
            >
              {this.state.category}
            </Label>
          </div>
        )}

        <Card.Group itemsPerRow={5}>
          {products &&
            products.map(product => {
              return (
                <Card color="teal" key={product.id} id="ProductsList">
                  <Card.Content>
                    <NavLink to={`products/${product.id}`}>
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
                          onClick={event =>
                            this.handleDelete(event, product.id)
                          }
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
  products: state.allProductsReducer.products,
  user: state.user,
  cart: state.cartReducer,
  category: state.allProductsReducer.categoryInfo,
  allCategories: state.allProductsReducer.categories
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: filterTag => dispatch(getAllProductsThunk(filterTag || '')),
  deleteProduct: productId => dispatch(deleteProductThunk(productId)),
  quickAdd: item => dispatch(addToCartThunk(item)),
  setCartId: id => dispatch(setCartIdThunk(id)),
  getCategoryInfo: category => dispatch(getCategoryInfoThunk(category)),
  fetchCategories: () => dispatch(getAllCategoriesThunk())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(allProducts)
);
