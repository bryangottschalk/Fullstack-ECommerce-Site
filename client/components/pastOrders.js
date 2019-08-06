import React from 'react';
import { connect } from 'react-redux';
import { getPastOrdersThunk } from '../store/pastOrders';
import { PastOrdersCard } from './PastOrdersCard';
import { Card } from 'semantic-ui-react';

export class pastOrders extends React.Component {
  async componentDidMount() {
    await this.props.getPastOrders();
  }

  render() {
    const pastOrders = this.props.pastOrders;

    return (
      <div>
        <div>
          <h2>Your past orders:</h2>
        </div>
        <Card.Group>
          {pastOrders.map(order => (
            <Card key={order.id}>
              <PastOrdersCard order={order} />
            </Card>
          ))}
        </Card.Group>
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
