import React from 'react';
import { connect } from 'react-redux';
import { getSingleUserThunk } from '../store/singleUser';

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Your info:</h1>
        <h2>
          Name: {user.firstName} {user.lastName}
        </h2>
        <h2>Email: {user.email}</h2>
        <h2>Address: {user.address}</h2>
        <h2>Account Type: {user.isAdmin ? 'Admin' : 'User'}</h2>
        <button>See past orders</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.singleUserReducer
  };
};

const mapDispatchToProps = dispatch => ({
  getUser: userId => dispatch(getSingleUserThunk(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
