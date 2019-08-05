import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  getCartThunk,
  deleteFromCartThunk,
  updateCartThunk,
  setCartIdThunk
} from '../store/cart';
import {
  Button,
  Image,
  Icon,
  Table,
  Step,
  Input,
  Segment
} from 'semantic-ui-react';

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { active: 'Cart', ...this.props.cart };
    this.state = { active: 'Cart' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.setState = {active : 'blah blah'}
  }

  async componentDidMount() {
    await this.props.setCartId(this.props.user.id);
    await this.props.getCart(this.props.cart.id);
  }

  deleteFromCart = (event, orderId, productId) => {
    event.preventDefault();
    this.props.deleteFromCart(orderId, productId);
  };

  handleChange(event) {
    console.log('event.target.name  ', event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
    // this.setState = { items: this.props.cart.items };
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState = { active: 'Confirm' };
  }
  // updateCart = newItem => {
  //   this.props.updateCart(newItem);
  // };

  render() {
    console.log('PROPS  ', this.props);
    console.log('cart.items ', this.props.cart.items);

    const { cart } = this.props;
    const { active } = this.state;
    return (
      <div>
        <div style={{ fontSize: '30px', marginBottom: '30px' }}>My Cart</div>
        <Step.Group>
          <Step active={active === 'Cart'}>
            <Icon name="cart arrow down" />
            <Step.Content>
              <Step.Title>Cart</Step.Title>
              <Step.Description>Add items to the cart</Step.Description>
            </Step.Content>
          </Step>
          <Step active={active === 'Confirm'}>
            <Icon name="checkmark box" />
            <Step.Content>
              <Step.Title>Confirm</Step.Title>
              <Step.Description>Confirm your order</Step.Description>
            </Step.Content>
          </Step>
          <Step active={active === 'Shipping'}>
            <Icon name="truck" />
            <Step.Content>
              <Step.Title>Shipping</Step.Title>
              <Step.Description>Choose your shipping options</Step.Description>
            </Step.Content>
          </Step>
          <Step active={active === 'Billing'}>
            <Icon name="credit card" />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
              <Step.Description>Enter billing information</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
        {!this.props.cart.id ? (
          <div>Loading Cart...</div>
        ) : (
          <div>
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <Table striped size="large">
                <Table.Header>
                  <Table.Row textAlign="center">
                    <Table.HeaderCell />
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Unit Price</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Sub-total</Table.HeaderCell>
                    <Table.HeaderCell>Delete Item</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {cart.items.map(item => (
                    <Table.Row textAlign="center" item={item} key={item.id}>
                      <Table.Cell collapsing>
                        <Image
                          src={item.imageUrl}
                          size="tiny"
                          floated="right"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <NavLink to={`/products/${item.productId}`}>
                          {item.productName}
                        </NavLink>
                      </Table.Cell>
                      <Table.Cell>{item.unitPrice}</Table.Cell>
                      <Table.Cell>
                        <Input
                          name={item.id}
                          min="0"
                          step="1"
                          type="number"
                          defaultValue={item.quantity}
                          onChange={this.handleChange}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        $ {(item.unitPrice * item.quantity).toFixed(2)}
                      </Table.Cell>
                      <Table.Cell>
                        <Icon
                          link
                          color="red"
                          size="large"
                          name="delete"
                          onClick={event =>
                            this.deleteFromCart(
                              event,
                              this.props.cart.id,
                              item.productId
                            )
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan="5">
                      <Button
                        floated="right"
                        icon
                        primary
                        size="huge"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </form>
          </div>
        )}
        {/* {this.state.status === 'Confirm' && ( */}
        <div>
          <Segment textAlign="right">
            <div>
              Cart Subtotal: ${' '}
              {cart.items
                .map(item => item.unitPrice * item.quantity)
                .reduce((prev, current) => prev + current, 0)
                .toFixed(2)}
            </div>
            <div>Shipping: Free</div>
            <div>
              You pay:{' '}
              <span style={{ fontWeight: 'bold' }}>
                ${' '}
                {cart.items
                  .map(item => item.unitPrice * item.quantity)
                  .reduce((prev, current) => prev + current, 0)
                  .toFixed(2)}
              </span>
            </div>
          </Segment>
        </div>

        {/* )} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cartReducer,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getCart: cartId => dispatch(getCartThunk(cartId)),
  setCartId: id => dispatch(setCartIdThunk(id)),
  deleteFromCart: (orderId, productId) =>
    dispatch(deleteFromCartThunk(orderId, productId)),
  updateCart: newItem => dispatch(updateCartThunk(newItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
