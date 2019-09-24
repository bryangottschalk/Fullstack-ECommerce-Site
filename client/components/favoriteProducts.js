import React from 'react';
import { connect } from 'react-redux';
import { getAllProductsThunk } from '../store/allProducts';
import { Header, Image } from 'semantic-ui-react';

export class FavoriteProducts extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Header size="large" textAlign="center" color="blue">
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
