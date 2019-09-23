import React from 'react';

import { Navbar } from './components';
import { connect } from 'react-redux';
import { setUserStatus, setAdminStatus } from './store/userType';
import Routes from './routes';
import { Container } from 'semantic-ui-react';

class App extends React.Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.setUser(true);
    }
    if (this.props.user.isAdmin) {
      this.props.setAdmin(true);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Routes />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userType: state.typeReducer,
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return {
    setUser: bool => dispatch(setUserStatus(bool)),
    setAdmin: bool => dispatch(setAdminStatus(bool))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
