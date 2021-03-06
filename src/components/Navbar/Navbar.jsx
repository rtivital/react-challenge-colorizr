import React from 'react';
import { Container } from 'ui';
import { Logo } from 'components';
import NavbarLink from './NavbarLink';
import './navbar.scss';

const Navbar = () => (
  <nav className="navbar">
    <Container className="navbar__inner">
      <div className="navbar__logo"><Logo /></div>
      <div className="navbar__navigation">
        <NavbarLink index className="navbar__link" to="/">Create</NavbarLink>
        <NavbarLink className="navbar__link" to="/explore">Explore</NavbarLink>
        <NavbarLink className="navbar__link" to="/export">Export</NavbarLink>
      </div>
    </Container>
  </nav>
);

export default Navbar;
