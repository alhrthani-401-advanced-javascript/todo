import React from 'react';

import ToDo from './components/todo/todo-connected';
import SiteContext from './context/site';
import LoginContext from './context/auth';
import Auth from './components/Auth/auth'

import Login from './components/login'




class App extends React.Component {
  static contextType = LoginContext;
    render() {
      return (
        <SiteContext>
        <LoginContext>
          <Login />
          <hr />
          {/* <EditLink /> */}
          {/* <DeleteLink /> */}
          <Auth condition={this.context.loggedIn}>
          <ToDo/>
          </Auth>
        </LoginContext>
        </SiteContext>
      );
    }
  }
  export default App;