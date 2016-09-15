import React, { PropTypes } from 'react';
import cx from 'classnames';

const Container = ({ children, className }) => (
  <div className={cx('container', className)}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default Container;
