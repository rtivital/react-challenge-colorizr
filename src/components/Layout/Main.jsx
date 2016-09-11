import React, { PropTypes } from 'react';
import cx from 'classnames';

const Main = ({ children }, { sidebarOpened }) => {
  const className = cx('main', {
    'main--sidebar-opened': sidebarOpened,
  });

  return (
    <main className={className}>
      {children}
    </main>
  );
};

Main.propTypes = {
  children: PropTypes.any,
};

Main.contextTypes = {
  sidebarOpened: PropTypes.bool,
};

export default Main;
