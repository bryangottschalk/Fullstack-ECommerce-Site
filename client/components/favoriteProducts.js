import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllProductsThunk } from '../store/allProducts';
import { Card, Button } from 'semantic-ui-react';

export class FavoriteProducts extends React.Component {
  render() {
    console.log('PORPs!!!!', this.props);
    const one = this.props;
    console.log('one', one);
    return (
      <div>
        <h3>Our Favorites</h3>
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
