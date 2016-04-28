import React , { Component } from 'react';
import Counter from './components/Counter/Counter';

import '../sass/main.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1 className="title"> Basic Counter Example</h1>
        <Counter count={100} step={20} />
      </div>
    );
  }
}
