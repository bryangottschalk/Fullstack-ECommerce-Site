import React from 'react';
import { connect } from 'react-redux';
import { getPastOrdersThunk } from '../store/pastOrders';
import { PastOrdersCard } from './PastOrdersCard';
import {
  Container,
  Button,
  Card,
  Image,
  Rating,
  Icon,
  Grid,
  Row
} from 'semantic-ui-react';

export class pastOrders extends React.Component {
  async componentDidMount() {
    await this.props.getPastOrders();
  }

  render() {
    const pastOrders = this.props.pastOrders;
    console.log('past orders', pastOrders);

    return (
      <div>
        <div>
          <h2>Your past orders:</h2>
        </div>
        <Grid divided="vertically">
          {pastOrders.map(order => (
            <Grid.Row key={order.id} columns={1}>
              <PastOrdersCard order={order} />
            </Grid.Row>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pastOrders: state.pastOrdersReducer
});

const mapDispatchToProps = dispatch => ({
  getPastOrders: () => dispatch(getPastOrdersThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(pastOrders);
