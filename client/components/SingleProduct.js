import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';
import ListReviews from './ListReviews';
import { postReviewThunk } from '../store/reviews';
import { getSingleProductThunk } from '../store/singleProduct';
import { Rating, Dropdown, Button } from 'semantic-ui-react';
import { addToCartThunk, setCartIdThunk } from '../store/cart';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  handleChange(event, { value }) {
    this.setState({
      quantity: value
    });
  }

  async addProduct(product) {
    await this.props.setCartId(this.props.user.id);
    await this.props.quickAdd({
      quantity: this.state.quantity,
      unitPrice: product.price,
      productId: product.id,
      orderId: this.props.cart.id
    });
  }

  handleFormSubmit(evt, formState) {
    evt.preventDefault();
    this.props.postReview(
      formState,
      this.props.match.params.id,
      `/products/${this.props.match.params.id}`
    );
  }

  render() {
    console.log('PROPS  ', this.props);
    const { product } = this.props;
    const oldReviews = product.reviews;
    const newReviews = this.props.reviews;
    const qtyOptions = [
      {
        key: '1',
        text: '1',
        value: 1
      },
      {
        key: '2',
        text: '2',
        value: 2
      },
      {
        key: '3',
        text: '3',
        value: 3
      },
      {
        key: '4',
        text: '4',
        value: 4
      },
      {
        key: '5',
        text: '5',
        value: 5
      }
    ];
    return (
      <div>
        {/* <img src={product.imageUrl} /> */}
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

        <Button
          className="addToCart"
          onClick={() => this.addProduct(product)}
          type="button"
        >
          Add To Cart
        </Button>
        <Dropdown
          onChange={this.handleChange}
          placeholder="qty"
          fluid
          selection
          options={qtyOptions}
          value={this.state.quantity}
        />
        <ReviewForm
          productId={product.id}
          handleFormSubmit={this.handleFormSubmit}
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
  postReview: (formSubmission, productId, redirectPath) =>
    dispatch(postReviewThunk(formSubmission, productId, redirectPath))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
