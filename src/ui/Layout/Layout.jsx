import React, { PropTypes } from 'react';

const Layout = ({ children }) => (
  <div className="layout">
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
