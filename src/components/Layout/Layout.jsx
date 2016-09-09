import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';

import './layout.scss';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  static childContextTypes = {
    sidebarOpened: PropTypes.bool,
    toggleSidebar: PropTypes.func,
    openSidebar: PropTypes.func,
    closeSidebar: PropTypes.func,
  }

  getChildContext() {
    return {
      sidebarOpened: this.state.opened,
      toggleSidebar: this.toggle,
      openSidebar: this.open,
      closeSidebar: this.close,
    };
  }

  state = { opened: false };

  componentWillMount() {
    this.hideOnMobile();
    window.removeEventListener('resize', this.debounceMobile);
  }

  componentDidMount() {
    window.addEventListener('resize', this.debounceMobile);
  }

  close = () => {
    this.setState({ opened: false });
  }

  open = () => {
    this.setState({ opened: true });
  }

  toggle = () => {
    if (this.state.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  hideOnMobile = debounce(() => {
    const viewport = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewport < 560) { this.close(); }
  }, 200)

  render() {
    return (
      <div className="layout">
        {this.props.children}
      </div>
    );
  }
}
