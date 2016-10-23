import React, { Component, PropTypes } from 'react';
import './calc.scss';

const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 107, 189, 13, 106, 111, 190, 8];
const charButtons = ['.', '+', '-', '*', '/'];

const CalcButton = ({ button, onClick }) => (
  <input className="calc__button" type="button" value={button} onClick={onClick} />
);

CalcButton.propTypes = {
  button: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default class Calc extends Component {
  state = {
    value: '',
    result: '',
  }

  handleValueChange = (value) => {
    this.setState({ value });
  }

  handleButtonClick = (event) => {
    this.handleValueChange(this.state.value + event.target.value);
  }

  handleInputChange = (event) => {
    this.handleValueChange(event.target.value);
  }

  clearValue = () => {
    this.setState({ value: '' });
  }

  handleKeyDown = (event) => {
    const { which } = event;
    if (!keyCodes.some((code) => code === which)) {
      event.preventDefault();
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    try {
      const result = eval(this.state.value); // eslint-disable-line no-eval
      if (!isNaN(result) && isFinite(result)) {
        this.setState({ result });
      } else {
        this.setState({ result: 'ERROR' });
      }
    } catch (e) {
      this.setState({ result: 'ERROR' });
    }
  }

  render() {
    const { value, result } = this.state;

    const numbers = numberButtons.map((button, index) => (
      <CalcButton button={button} key={`${index}-number`} onClick={this.handleButtonClick} />
    ));

    const chars = charButtons.map((button, index) => (
      <CalcButton button={button} key={`${index}-char`} onClick={this.handleButtonClick} />
    ));

    return (
      <div className="calc">
        <div className="calc__result">
          <span>Result: </span>
          <span>{result}</span>
        </div>

        <form onSubmit={this.onSubmit}>
          <input className="calc__input" value={value} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} />
        </form>

        <div className="calc__buttons">
          <div className="calc__numbers">{numbers}</div>
          <div className="calc__chars">
            {chars}
            <CalcButton button="Clear" onClick={this.clearValue} />
            <CalcButton button="=" onClick={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}
