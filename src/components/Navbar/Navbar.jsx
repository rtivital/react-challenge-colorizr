import React from 'react';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';
import { Logo } from 'app/components';
import NavbarLink from './NavbarLink';
import './navbar.scss';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar__inner">
      <div className="narbar__logo">
        <Logo />
      </div>

      <div className="navbar__navigation">
        <NavbarLink index className="navbar__link" to="/">Create</NavbarLink>
        <NavbarLink className="navbar__link" to="/explore">Explore</NavbarLink>
        <NavbarLink className="navbar__link" to="/export">Export</NavbarLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
