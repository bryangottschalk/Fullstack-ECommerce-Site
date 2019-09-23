import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllProductsThunk } from '../store/allProducts';
import { Card, Button, Header, Image } from 'semantic-ui-react';

export class FavoriteProducts extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Header size="large" textAlign="center" color="orange">
            Your new best friend awaits!
          </Header>
        </div>
        <div className="homeImages">
          <Image src="cody.jpg" size="big" centered fluid />
        </div>
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
