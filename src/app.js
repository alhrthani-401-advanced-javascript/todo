import React from 'react';

import ToDo from './components/todo/todo-connected';
import SiteContext from './context/site';




export default class App extends React.Component {
  render() {
    return (
      <>
      <SiteContext>
          <ToDo />
      </SiteContext>
      </>
    );
  }
}
