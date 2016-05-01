import React, { Component } from 'react';
import Button from '../Button/Button';
import './counter.scss';

export default class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: this.props.count,
      step: this.props.step,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.increaseStep = this.increaseStep.bind(this);
    this.decreaseStep = this.decreaseStep.bind(this);
  }

  increment() {
    this.setState({ count: this.state.count + this.state.step });
  }

  decrement() {
    this.setState({ count: this.state.count - this.state.step });
  }

  increaseStep() {
    this.setState({ step: this.state.step + 1 });
  }

  decreaseStep() {
    if (this.state.step - 1 !== 0) {
      this.setState({ step: this.state.step - 1 });
    }
  }

  render() {
    return (
      <div className="counter">
        <div className="counter__body">
          <div className="counter__display">
            <div className="counter__count">{this.state.count}</div>
            <div className="counter__step">Counter step: <b>{this.state.step}</b></div>
          </div>

          <div className="counter__controls">
            <h3 className="counter__heading">Counter Controls</h3>
            <Button type="success" onClick={this.increment}>Increment</Button>
            <Button type="danger" onClick={this.decrement}>Decrement</Button>
          </div>

          <div className="counter__controls">
            <h3 className="counter__heading">Step Controls</h3>
            <Button onClick={this.increaseStep}>Increase Step</Button>
            <Button onClick={this.decreaseStep}>Decrease Step</Button>
          </div>
        </div>
      </div>
    );
  }
}

// Make eslint happy: add validation to props
Counter.propTypes = {
  count: React.PropTypes.number,
  step: React.PropTypes.number,
};

Counter.defaultProps = {
  count: 10,
  step: 5,
};
