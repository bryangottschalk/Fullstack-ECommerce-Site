import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';
import ListReviews from './ListReviews';
import { getSingleProductThunk } from '../store/singleProduct';
import { Rating, Button, Input, Label } from 'semantic-ui-react';
import { addToCartThunk, setCartIdThunk } from '../store/cart';
import { getAllProductsThunk } from '../store/allProducts';
import { NavLink } from 'react-router-dom';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async addProduct(product) {
    await this.props.setCartId(this.props.user.id);
    await this.props.quickAdd({
      quantity: this.state.quantity,
      unitPrice: product.price,
      productId: product.id,
      orderId: this.props.cart.id,
      productName: product.name,
      imageUrl: product.imageUrl
    });
  }

  render() {
    const { product } = this.props;
    const oldReviews = product.reviews;
    const newReviews = this.props.reviews;
    const categories = product.categories;

    return (
      <div>
        {/* <img src={product.imageUrl} /> */}
        <div>
          {categories ? (
            categories.map(category => (
              <NavLink
                to={`/products?categoryTag=${category.Name}`}
                key={category.id}
              >
                <Label color="teal" tag size="large">
                  {category.name}
                </Label>
              </NavLink>
            ))
          ) : (
            <div>Category information not available</div>
          )}
        </div>
        <img src="https://placekitten.com/100/150" />
        <h1>{product.name}</h1>
        <div>
          RATING:
          {product.avgStar !== null ? (
            <Rating
              icon="star"
              defaultRating={Math.floor(1 + Math.random() * 5)}
              maxRating={5}
              size="huge"
              disabled
            />
          ) : (
            'N/A'
          )}{' '}
          {product.avgStar}
        </div>
        <h3>{`$${product.price}`}</h3>
        <h3>{product.description}</h3>
        <Input
          onChange={this.handleChange}
          name="quantity"
          type="number"
          value={this.state.quantity}
          placeholder="Enter quantity"
          min="0"
          step="1"
        />{' '}
        <Button
          className="addToCart"
          color="teal"
          onClick={() => this.addProduct(product)}
          type="button"
        >
          Add To Cart
        </Button>
        <ReviewForm
          productId={product.id}
          userName={`${this.props.user.firstName} ${this.props.user.lastName}`}
          imageUrl={this.props.user.imageUrl}
        />
        <ListReviews oldReviews={oldReviews} newReviews={newReviews} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.singleProductReducer,
  user: state.user,
  cart: state.cartReducer,
  reviews: state.productReviewsReducer
});

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getSingleProductThunk(productId)),
  quickAdd: item => dispatch(addToCartThunk(item)),
  setCartId: userId => dispatch(setCartIdThunk(userId)),
  getCategoryProduct: categoryTag => dispatch(getAllProductsThunk(categoryTag))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
