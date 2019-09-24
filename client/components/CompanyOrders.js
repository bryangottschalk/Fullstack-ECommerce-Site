import React from 'react';
import { connect } from 'react-redux';
import { getAllOrdersThunk } from '../store/pastOrders';
import { NavLink } from 'react-router-dom';

import { Card, Image, Header } from 'semantic-ui-react';
import user from '../store/user';

class CompanyOrders extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFilter: 'All Orders'
    };
  }
  async componentDidMount() {
    await this.props.getAllOrders();
  }

  handleChange = event => {
    this.setState({
      selectedFilter: event.target.value
    });
  };
  filterCompanyOrders = (allOrders, status) => {
    //filter by status
    const filtered = allOrders.filter(order => {
      if (status === 'All Orders') {
        return allOrders;
      }
      return order.status === status;
    });
    // filter out incomplete orders anon orders
    // add this option back later if you decide to display incomplete orders with status cart (they have no user object so will need to choose default values for imageUrl etc)
    return filtered.filter(order => {
      return order.user !== null;
    });
  };

  render() {
    const { companyOrders } = this.props;
    const filteredOrders = this.filterCompanyOrders(
      companyOrders,
      this.state.selectedFilter
    );

    return (
      <div>
        <Header size="huge" color="orange">
          Company Orders
        </Header>
        <h2>Filter by status:</h2>
        <select onChange={this.handleChange}>
          <option value="All Orders">All Orders</option>
          <option value="Cart">Cart</option>
          <option value="Created">Created</option>
          <option value="Processing">Processing</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <Card.Group itemsPerRow={5}>
          {filteredOrders &&
            filteredOrders.map(order => {
              return (
                <Card key={order.id}>
                  <div>
                    <Image src={order.user.imageUrl} />
                    <h3>
                      User: {`${order.user.firstName} ${order.user.lastName}`}
                    </h3>
                    <h3>Email: {order.user.email}</h3>
                    <h3>Address: {order.shippingAddress || `N/A`}</h3>
                    <h3>Total: {`$${order.total}`}</h3>
                    <h3>Status: {order.status}</h3>
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
});

const mapDispatchToProps = dispatch => {
  return {
    //add thunk to get all orders
    getAllOrders: () => dispatch(getAllOrdersThunk())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyOrders);
