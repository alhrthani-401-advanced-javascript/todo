import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

const API = process.env.REACT_APP_API||'https://todoapi-ahmad.herokuapp.com/api/v1/user';
const testLogins = {
  testAdmin: process.env.REACT_APP_ADMIN_TOKEN || 'dontTellAnyOneAboutMe',
  testEditor: process.env.REACT_APP_EDITOR_TOKEN || 'dontTellAnyOneAboutMe',
  testUser: process.env.REACT_APP_USER_TOKEN || 'dontTellAnyOneAboutMe',
};

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      login: this.login,
      logout: this.logout,
      user: {},
    };
  }

  login = (username, password) => {
    // This is foul and unsafe ... but when working offline / testmode ess oh kay
    if (testLogins[username]) {
      this.validateToken(testLogins[username]);
    }
    else {
      fetch(`${API}/signin`, {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        headers: new Headers({
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('token>>>',data.token);
          this.validateToken(data.token)})
        .catch(console.error);
    }
  }

  validateToken = token => {
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET||'dontTellAnyOneAboutMe');
      console.log('all good');
      this.setLoginState(true, token, user);
    }
    catch (e) {
      this.setLoginState(false, null, {});
      console.log('Token Validation Error', e);
    }

  };

  logout = () => {
    this.setLoginState(false, null, {});
  };

  setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    this.setState({ token, loggedIn, user });
  };

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;