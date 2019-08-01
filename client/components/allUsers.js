import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllUsersThunk, deleteUserThunk } from '../store/allUsers';

export class allUsers extends React.Component {
  async componentDidMount() {
    await this.props.fetchUsers();
  }

  handleDelete = (event, userId) => {
    event.preventDefault();
    this.props.deleteUser(userId, '/users');
  };

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
                <button
                  type="button"
                  className="remove"
                  onClick={event => this.handleDelete(event, user.id)}
                >
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
  deleteUser: (userId, redirectPath) =>
    dispatch(deleteUserThunk(userId, redirectPath)),
  fetchUsers: () => dispatch(getAllUsersThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(allUsers);
