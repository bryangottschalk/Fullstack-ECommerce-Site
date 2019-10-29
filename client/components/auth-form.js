import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { Button, Form } from 'semantic-ui-react';

/**
 * COMPONENT
 */
class AuthForm extends React.Component {
  render() {
    const { name, displayName, handleLogin, handleSignUp, error } = this.props;

    return (
      <div>
        <Form
          className="signUpForm"
          onSubmit={name === 'login' ? handleLogin : handleSignUp}
          name={name}
        >
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          {name === 'signup' && (
            <div>
              <div>
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input
                  className="signUp"
                  name="firstName"
                  type="text"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">
                  <small>Last Name</small>
                </label>
                <input className="signUp" name="lastName" type="text" />
              </div>
              <div>
                <label htmlFor="address">
                  <small>Address</small>
                </label>
                <input className="signUp" name="address" type="text" />
              </div>
            </div>
          )}
          <div>
            <Button color="orange" type="submit">
              {displayName}
            </Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>

        {name === 'login' && (
          <div>
            <hr />
            <div style={{ marginBottom: 10 }}>
              <strong>Admin login </strong> (to see admin functionality for this
              application)
            </div>
            <li>email: cody.cody@email.com</li>
            <li>password: 123</li>
          </div>
        )}

        {/* <a href="/auth/google">{displayName} with Google</a> */}
      </div>
    );
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleLogin(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth({ email, password }, formName));
    },
    handleSignUp(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const address = evt.target.address.value;
      dispatch(
        auth({ email, password, firstName, lastName, address }, formName)
      );
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  error: PropTypes.object
};
