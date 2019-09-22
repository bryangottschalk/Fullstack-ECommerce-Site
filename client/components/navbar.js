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
  Image
} from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <Image size="mini" src="/logo.png" style={{ marginRight: '1.5em' }} />
          Cody & Co. Pet Store
        </Menu.Item>
        <Menu.Item as={NavLink} to="/home">
          Home
        </Menu.Item>

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
                <Dropdown.Item as={NavLink} to="/products?categoryTag=1Reptile">
                  Reptile
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/products?categoryTag=1Cat">
                  Cat
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/products?categoryTag=1Panda">
                  Panda
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/products?categoryTag=1Hamster">
                  Hamster
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item as={NavLink} to="/cart">
          Cart
        </Menu.Item>
        {isAdmin && (
          <div>
            <Menu.Item as={NavLink} to="/orders">
              Company Orders
            </Menu.Item>
            <Menu.Item as={NavLink} to="/users">
              All Users
            </Menu.Item>
            <Menu.Item as={NavLink} to="/productForm">
              Create New Product
            </Menu.Item>
          </div>
        )}
        {isLoggedIn ? (
          <Menu.Item onClick={handleClick}>Logout</Menu.Item>
        ) : (
          <div>
            <Menu.Item as={NavLink} to="/login">
              Login
            </Menu.Item>
            <Menu.Item as={NavLink} to="/signup">
              Sign Up
            </Menu.Item>
          </div>
        )}
      </Container>
    </Menu>

    {/* </Menu>
    <NavLink to="/">
      <Header className="mainHeader" as="h1" size="huge" textAlign="center">
        {' '}
        Cody & Co. Pet Store{' '}
      </Header>
    </NavLink> */}
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

          {isAdmin && (
            <NavLink to="/orders">
              <Button basic color="orange">
                Company Orders
              </Button>
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/users">
              <Button basic color="orange">
                All Users
              </Button>
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/productForm">
              <Button basic color="orange">
                Create new product
              </Button>
            </NavLink>
          )}
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
