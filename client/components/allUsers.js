import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllUsersThunk } from '../store/allUsers';
//import removeUser thunk ??

export class allUsers extends React.Component {
  async componentDidMount() {
    await this.props.fetchUsers();
  }

  render() {
    const users = this.props.users;
    return (
      <div>
        <ul id="UsersList">
          {users.map(user => {
            return (
              <li key={user.id}>
                <NavLink to={`users/${user.id}`}>
                  FIRST NAME: {user.firstName}
                  LAST NAME : {user.lastName}
                  ADDRESS: {user.address}
                </NavLink>

                <img className="user-image" src={user.imageUrl} />
                <button type="button" className="remove">
                  DELETE USER
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.allUsersReducer
});

const mapDispatchToProps = dispatch => ({
  // removeUser: userId => dipsatch(removeUserThunk(userId))
  fetchUsers: () => dispatch(getAllUsersThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(allUsers);
