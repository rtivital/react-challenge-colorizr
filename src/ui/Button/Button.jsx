import React, { PropTypes } from 'react';

const Button = ({ children }) => (
  <button className="button">{children}</button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
