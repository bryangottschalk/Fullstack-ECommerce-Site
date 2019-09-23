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
  Icon
} from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div style={{ marginBottom: 20 }}>
    <Menu>
      <Container>
        {/* <Menu.Item as={NavLink} to="/" header>
          <Image size="mini" src="/logo.png" style={{ marginRight: '1.5em' }} />
          Cody & Co. Pet Store
        </Menu.Item> */}
        <Button inverted color="blue" as={NavLink} to="/">
          CODY & CO
        </Button>

        <Menu.Menu position="right">
          {isAdmin && (
            <Dropdown className="adminPortal" item simple text="Admin Portal">
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
          <Dropdown item simple text="Adopt a Pet">
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/products">
                All Pets
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <i className="dropdown icon" />
                <span className="text">By Species</span>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/products?categoryTag=1Dog">
                    Dog
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={NavLink}
                    to="/products?categoryTag=1Reptile"
                  >
                    Reptile
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/products?categoryTag=1Cat">
                    Cat
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/products?categoryTag=1Panda">
                    Panda
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={NavLink}
                    to="/products?categoryTag=1Hamster"
                  >
                    Hamster
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
