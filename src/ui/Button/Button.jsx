import React, { PropTypes } from 'react';

const Button = ({ children, ...others }) => (
  <button className="button" {...others}>{children}</button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
