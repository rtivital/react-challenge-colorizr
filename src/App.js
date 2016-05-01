import React , { Component } from 'react';
import Counter from './components/Counter/Counter';

import './styles/main.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1 className="title"> Basic Counter Example</h1>
        <Counter />
      </div>
    );
  }
}
