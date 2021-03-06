import React, { Component, PropTypes } from 'react';
import { debounce } from 'lodash';

import { ColorSelection, Navbar, Footer } from 'components';
import { Layout, Main, Sidebar } from 'ui';

export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  state = { sidebarOpened: false };

  close = () => this.setState({ sidebarOpened: false })
  open = () => this.setState({ sidebarOpened: true })
  toggle = () => this.state.sidebarOpened ? this.close() : this.open()

  hideOnMobile = debounce(() => {
    const viewport = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewport < 560) { this.close(); }
  }, 200)

  componentDidMount() {
    this.hideOnMobile();
    window.removeEventListener('resize', this.debounceMobile);
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.debounceMobile);
  }

  render() {
    const { sidebarOpened } = this.state;
    return (
      <Layout>
        <Sidebar
          sidebarOpened={sidebarOpened}
          toggleSidebar={this.toggle}
          closeSidebar={this.close}
        >
          <ColorSelection colors={['#fff', '#ccc', '#bbb']} />
        </Sidebar>
        <Main sidebarOpened={sidebarOpened}>
          <Navbar />
          {this.props.children}
          <Footer />
        </Main>
      </Layout>
    );
  }
}
