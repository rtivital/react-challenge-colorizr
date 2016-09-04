import React, { PropTypes } from 'react';
import cx from 'classnames';

import './burger.scss';

const Burger = ({ active, className, theme, onClick }) => {
  const classNames = cx('burger', className, {
    'burger--active': active,
    'burger--light': theme === 'light',
    'burger--dark': theme === 'dark',
  });

  return (
    <div className={classNames} onClick={onClick}>
      <span className="burger__icon"></span>
    </div>
  );
};

Burger.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Burger.defaultProps = {
  active: true,
  theme: 'light',
};

export default Burger;
