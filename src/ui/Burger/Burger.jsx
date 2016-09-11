import React, { PropTypes } from 'react';
import cx from 'classnames';

import './burger.scss';

const Burger = ({ active, className, theme, onClick }) => {
  const classNames = cx('burger', `burger--${theme}`, className, {
    'burger--active': active,
  });

  return (
    <button className={classNames} onClick={onClick}>
      <span className="burger__icon" />
    </button>
  );
};

Burger.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
};

Burger.defaultProps = {
  active: true,
  theme: 'light',
};

export default Burger;
