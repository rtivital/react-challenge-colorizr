import React, { PureComponent, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import cx from 'classnames';
import { Burger } from 'ui';

@onClickOutside
export default class Sidebar extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    sidebarOpened: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    closeSidebar: PropTypes.func.isRequired,
  }

  handleClickOutside = () => {
    this.props.closeSidebar();
  }

  render() {
    const { children, sidebarOpened, toggleSidebar } = this.props;

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
  }
}
