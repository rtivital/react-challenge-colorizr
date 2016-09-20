import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const NavbarLink = ({ index, to, children }) => {
  const LinkComponent = index ? IndexLink : Link;

  return (
    <LinkComponent
      className="navbar__link"
      activeClassName="navbar__link--active"
      to={to}
    >
      {children}
    </LinkComponent>
  );
};

NavbarLink.propTypes = {
  index: PropTypes.bool,
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default NavbarLink;
