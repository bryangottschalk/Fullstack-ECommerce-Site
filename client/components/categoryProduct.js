import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
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

export class categoryProduct extends React.Component {
  async componentDidMount() {
    await this.props.fetchProducts(this.props.location.search);
    await this.props.getCategoryInfo(this.props.location.search);
    await this.props.fetchCategories();
  }

  handleDelete = (event, productId) => {
    event.preventDefault();
    this.props.deleteProduct(productId, '/products');
  };

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
    const products = this.props.products;
    const categoryName = this.props.category.name;

    return (
      <div>
        <div>
          Filter:{' '}
          <NavLink to="/products">
            <Label color="orange" tag size="large">
              {categoryName}
            </Label>
          </NavLink>
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(categoryProduct);
