import React from 'react';
import { connect } from 'react-redux';
import { getAllOrdersThunk } from '../store/pastOrders';
import { NavLink } from 'react-router-dom';

import {
  Button,
  Card,
  Image,
  Rating,
  Icon,
  Grid,
  Label,
  Input
} from 'semantic-ui-react';
import user from '../store/user';

class CompanyOrders extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getAllOrders();
  }
  render() {
    const { companyOrders } = this.props;

    // console.log('props on company orders', this.props);
    // console.log('state in company orders', this.state);
    return (
      <div>
        <h1>Company Orders:</h1>
        <Card.Group itemsPerRow={5}>
          {companyOrders &&
            companyOrders.map(order => {
              return (
                <Card key={order.id}>
                  <div>
                    <Image src={order.user.imageUrl} />
                    <h3>
                      User: {`${order.user.firstName} ${order.user.lastName}`}
                    </h3>
                    <h3>Email: {order.user.email}</h3>
                    <h3>Address: {order.shippingAddress || `N/A`}</h3>
                    <h3>Total {`$${order.total}`}</h3>
                    <ul>
                      {order.products.map(product => {
                        return (
                          <NavLink
                            key={product.id}
                            to={`products/${product.id}`}
                          >
                            <li>{product.name}</li>
                          </NavLink>
                        );
                      })}
                    </ul>
                  </div>
                </Card>
              );
            })}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companyOrders: state.pastOrdersReducer
  // user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    //add thunk to get all orders
    getAllOrders: () => dispatch(getAllOrdersThunk())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyOrders);
