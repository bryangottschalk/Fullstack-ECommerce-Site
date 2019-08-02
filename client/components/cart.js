import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Card, Image, Icon, Grid } from 'semantic-ui-react';

export class Cart extends React.Component {
  render() {
    return <div>My Cart</div>;
  }
}

export default connect()(Cart);
