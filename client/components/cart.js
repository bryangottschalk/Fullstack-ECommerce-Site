import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  getCartThunk,
  deleteFromCartThunk,
  updateCartThunk
} from '../store/cart';
import { Button, Card, Image, Icon, Grid, Table } from 'semantic-ui-react';

export class Cart extends React.Component {
  async componentDidMount() {
    await this.props.getCart(this.props.cart.id);
  }

  deleteFromCart = (orderId, productId) => {
    event.preventDefault(this.props.cart.cartId);
    this.props.deleteFromCart(orderId, productId, '/cart');
  };

  updateCart = newItem => {
    this.props.updateCart(newItem);
  };

  render() {
    console.log('PROPS  ', this.props);
    return (
      <div>
        <div style={{ fontSize: '30px' }}>My Cart</div>
        {/* {colors.map(color => (
          <Table color={color} key={color}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Food</Table.HeaderCell>
                <Table.HeaderCell>Calories</Table.HeaderCell>
                <Table.HeaderCell>Protein</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Apples</Table.Cell>
                <Table.Cell>200</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Orange</Table.Cell>
                <Table.Cell>310</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ))} */}
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
  deleteFromCart: (orderId, productId, redirectpPath) =>
    dispatch(deleteFromCartThunk(orderId, productId, redirectpPath)),
  updateCart: newItem => dispatch(updateCartThunk(newItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
