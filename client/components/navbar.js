import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store';
import {
  Button,
  Header,
  Menu,
  Dropdown,
  Container,
  Icon,
  Divider
} from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div style={{ marginBottom: 20 }}>
    <Menu>
      <Container
        as={Menu}
        style={{ border: 0 }}
        color="blue"
        stackable
        inverted
      >
        {/* <Menu.Item as={NavLink} to="/" header>
          <Image size="mini" src="/logo.png" style={{ marginRight: '1.5em' }} />
          Cody & Co. Pet Store
        </Menu.Item> */}
        <Button
          style={{ paddingLeft: 20, textAlign: 'center' }}
          inverted
          color="blue"
          as={NavLink}
          to="/"
        >
          CODY & CO
        </Button>

        <Menu.Menu position="right">
          {isAdmin && (
            <Dropdown
              className="adminPortal"
              floating
              labeled
              // button
              item
              // simple
              text="Admin Portal"
            >
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/orders">
                  Company Orders
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/users">
                  All Users
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/productForm">
                  Create New Product
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Menu.Item as={NavLink} to="/products">
            Browse Pets
          </Menu.Item>
          {!isLoggedIn && (
            <Menu.Item as={NavLink} to="/signup">
              Sign Up
            </Menu.Item>
          )}

          {isLoggedIn ? (
            <Menu.Item onClick={handleClick}>Logout</Menu.Item>
          ) : (
            <Menu.Item as={NavLink} to="/login">
              Login
            </Menu.Item>
          )}
          <Menu.Item as={NavLink} to="/cart">
            <Icon size="large" className="shopping cart" />
            Cart
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
    <div className="nav-divider" />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
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
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool
};
