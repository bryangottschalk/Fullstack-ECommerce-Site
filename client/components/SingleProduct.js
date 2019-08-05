import React from 'react';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';
import ListReviews from './ListReviews';
import { postReviewThunk } from '../store/reviews';
import { getSingleProductThunk } from '../store/singleProduct';
import { Dropdown, Button, Grid, Icon } from 'semantic-ui-react';
import { addToCartThunk, setCartIdThunk } from '../store/cart';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event, { value }) {
    this.setState({
      quantity: value
    });
  }

  async addProduct(product) {
    await this.props.quickAdd(product, this.props.cart.id, this.state.quantity);
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
        <h3>{`$${product.price}`}</h3>
        <h3>{product.description}</h3>
        <Grid className="singleProductCart" columns={2}>
          <Grid.Column className="forButton">
            <Button
              className="addToCart"
              onClick={() => this.addProduct(product)}
              type="button"
            >
              <Button.Content hidden>Add</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>
          </Grid.Column>
          <Grid.Column className="forQty">
            <Dropdown
              onChange={this.handleChange}
              placeholder="qty"
              fluid
              selection
              options={qtyOptions}
              value={this.state.quantity}
            />
          </Grid.Column>
        </Grid>
        <ReviewForm
          productId={product.id}
          handleFormSubmit={this.handleFormSubmit}
        />
        <ListReviews oldReviews={oldReviews} newReviews={newReviews} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProductReducer,
    user: state.user,
    cart: state.cartReducer,
    reviews: state.productReviewsReducer
  };
};

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getSingleProductThunk(productId)),
  quickAdd: (item, order, quantity) =>
    dispatch(addToCartThunk(item, order, quantity)),
  setCartId: userId => dispatch(setCartIdThunk(userId)),
  postReview: (formSubmission, productId, redirectPath) =>
    dispatch(postReviewThunk(formSubmission, productId, redirectPath))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
