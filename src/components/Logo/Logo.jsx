import React from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import logoImage from './logo.svg';
import './logo.scss';

const Logo = () => (
  <div className="logo">
    <IndexLink className="logo__link" to="/">
      <img className="logo__image" src={logoImage} alt="" />
    </IndexLink>
  </div>
);

export default Logo;
