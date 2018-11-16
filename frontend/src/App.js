import React, { Component } from 'react';

import Menu from './layout/Menu';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Menu/>               
        <p>Inicio</p>
      </div>
    );
  }
}

export default App;
