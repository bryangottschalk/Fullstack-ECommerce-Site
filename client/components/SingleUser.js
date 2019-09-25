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
        <h1>User information</h1>
        Name: {user.firstName} {user.lastName}
        <br />
        Email: {user.email}
        <br />
        Address: {user.address}
        <br />
        Account Type: {user.isAdmin ? 'Admin' : 'User'}
        {/* feature to add later <button>See past orders</button> */}
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
