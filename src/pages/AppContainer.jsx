import React, { PropTypes } from 'react';
import { Navbar } from 'app/components';

const AppContainer = ({ children }) => (
  <div className="app">
    <Navbar />
    {children}
  </div>
);

export default AppContainer;
