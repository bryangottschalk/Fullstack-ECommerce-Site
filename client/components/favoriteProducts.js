import React from 'react';
import { connect } from 'react-redux';
import { getAllProductsThunk } from '../store/allProducts';
import { Header, Image, Button, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export class FavoriteProducts extends React.Component {
  render() {
    return (
      <div>
        <div className="homeImages">
          <Image src="cody.jpg" size="big" centered />
        </div>
        <Header as="h2" textAlign="center" color="blue">
          Welcome to our pet store. Your new best friend awaits!
        </Header>
        <Header as="h3" textAlign="center" color="blue">
          - Cody, CEO
        </Header>
        <Container style={{ marginTop: 30 }} textAlign="center">
          <Button as={NavLink} to="/products" color="orange">
            Browse Our Pets
          </Button>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.allProductsReducer
});

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(getAllProductsThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteProducts);
