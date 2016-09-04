import React, { PropTypes } from 'react';
import { Navbar } from 'app/components';

const AppContainer = ({ children }) => (
  <div className="app">
    <Navbar />
    {children}
  </div>
);

AppContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AppContainer;
