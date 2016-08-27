import React, { PropTypes } from 'react';
import cx from 'classnames';

const BUTTON_TYPES = ['white', 'green'];

const Button = ({ children, className, theme, ...others }) => {
  const buttonClassName = cx('button', `button--${theme}`, className);

  return (
    <button className={buttonClassName} {...others}>{children}</button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  theme: PropTypes.oneOf(BUTTON_TYPES),
};

export default Button;
