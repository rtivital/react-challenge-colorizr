import React from 'react';
import './button.scss';

const Button = ({ type, onClick, children }) => (
  <button
    className={`btn btn__${type}`}
    onClick={typeof onClick === 'function' ? onClick : false}
  >
    {children}
  </button>
);

// Make ESLint happy again: add validation to props
Button.propTypes = {
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
  children: React.PropTypes.string,
};

Button.defaultProps = {
  type: 'default',
};

export default Button;
