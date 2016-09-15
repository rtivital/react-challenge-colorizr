import React, { PropTypes } from 'react';
import cx from 'classnames';
import { Burger } from 'ui';

const Sidebar = ({ children, sidebarOpened, toggleSidebar }) => {
  const className = cx('sidebar', {
    'sidebar--opened': sidebarOpened,
  });

  return (
    <aside className={className}>
      <div className="sidebar__burger">
        <Burger theme="dark" onClick={toggleSidebar} active={sidebarOpened} />
      </div>

      {children}
    </aside>
  );
};

Sidebar.propTypes = {
  children: PropTypes.any.isRequired,
  sidebarOpened: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
