import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export class Cart extends React.Component {
  render() {
    return <div>Hello... this is your cart!</div>;
  }
}

export default connect()(Cart);
