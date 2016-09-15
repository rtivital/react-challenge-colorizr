import React, { PropTypes } from 'react';
import { Navbar, Layout, Main, Sidebar } from 'components';

const AppContainer = ({ children }) => (
  <Layout>
    <Sidebar>Hello</Sidebar>

    <Main>
      <Navbar />
      {children}
    </Main>
  </Layout>
);

AppContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AppContainer;
