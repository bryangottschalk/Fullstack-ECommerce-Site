import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store';
import { Button, Header } from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <NavLink to="/">
      <Header className="mainHeader" as="h1" size="huge" textAlign="center">
        {' '}
        Cody and Co.{' '}
      </Header>
    </NavLink>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <NavLink to="/home">
            <Button basic color="orange">
              Home
            </Button>
          </NavLink>
          <NavLink to="/products">
            <Button basic color="orange">
              All Products
            </Button>
          </NavLink>
          <NavLink to="/cart">
            <Button basic color="orange">
              Cart
            </Button>
          </NavLink>
          <NavLink to="/myaccount">
            <Button basic color="orange">
              My Account
            </Button>
          </NavLink>
          <a href="#" onClick={handleClick}>
            <Button basic color="orange">
              Logout
            </Button>
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <NavLink to="/">
            <Button basic color="orange">
              Home
            </Button>
          </NavLink>
          <NavLink to="/products">
            <Button basic color="orange">
              All Products
            </Button>
          </NavLink>
          <NavLink to="/login">
            <Button basic color="orange">
              Login
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button basic color="orange">
              Sign Up
            </Button>
          </NavLink>
          <NavLink to="/cart">
            <Button basic color="orange">
              Cart
            </Button>
          </NavLink>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
