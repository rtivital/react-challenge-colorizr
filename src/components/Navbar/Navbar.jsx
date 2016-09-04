import React, { PropTypes } from 'react';
import { Logo } from 'app/components';
import { Container, Burger } from 'app/ui';
import NavbarLink from './NavbarLink';
import './navbar.scss';

const Navbar = (props, context) => {
  return (
    <nav className="navbar">
      <Container className="navbar__inner">
        <div className="narbar__logo">
          <Logo />
        </div>

        <div className="navbar__navigation">
          <NavbarLink index className="navbar__link" to="/">Create</NavbarLink>
          <NavbarLink className="navbar__link" to="/explore">Explore</NavbarLink>
          <NavbarLink className="navbar__link" to="/export">Export</NavbarLink>
        </div>
      </Container>
    </nav>
  );
};

Navbar.contextTypes = {
  sidebarOpened: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

export default Navbar;
