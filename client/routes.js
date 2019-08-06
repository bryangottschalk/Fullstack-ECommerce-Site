import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { me } from './store';
import {
  Login,
  Signup,
  UserHome,
  allProducts,
  allUsers,
  SingleProduct,
  SingleUser,
  Cart,
  PastOrders,
  FavoriteProducts,
  CategoryProduct,
  CompanyOrders,
  NotFound
} from './components';

/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={FavoriteProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/products" component={allProducts} />
        <Route exact path="/users" component={allUsers} />
        <Route path="/cart" component={Cart} />

        {isLoggedIn &&
          isAdmin && (
            <Switch>
              {/* Routes placed here are only available to admin users after logging in */}
              <Route path="/home" component={UserHome} />
              <Route exact path="/users/:id" component={SingleUser} />
              <Route exact path="/users" component={allUsers} />
              <Route path="/orders" component={CompanyOrders} />
              <Route exact path="/myaccount" component={PastOrders} />
              <Route component={NotFound} />
              {/* Once we create an orders component it can go here <Route exact path="/orders" component={Orders} /> */}
            </Switch>
          )}

        {isLoggedIn &&
          !isAdmin && (
            <Switch>
              {/* Routes placed here are available to all users after logging in */}
              {/* <Route exact path="/myaccount" component={MyAccount} /> */}
            </Switch>
          )}

        {/* Displays our 404 component as a fallback */}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
