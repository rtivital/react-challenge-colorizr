import React, { PropTypes } from 'react';
import cx from 'classnames';

const BUTTON_TYPES = ['white', 'green', 'red'];

const Button = ({ children, className, disabled, theme, ...others }) => {
  const buttonClassName = cx('button', `button--${theme}`, className, {
    'button--disabled': disabled,
  });

  return (
    <button className={buttonClassName} {...others}>{children}</button>
  );
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  theme: PropTypes.oneOf(BUTTON_TYPES),
  disabled: PropTypes.bool,
};

Button.defaultProps = { theme: 'white' };

export default Button;
