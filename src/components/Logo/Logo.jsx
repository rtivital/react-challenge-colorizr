import React, { PropTypes } from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import './logo.scss';

const Logo = ({ children, colors }) => {
  const letters = children.split('').map((letter, index) => (
    <span
      className="logo__letter"
      style={{ color: colors[index] }}
      key={`${letter}-${index}`}
    >
      {letter}
    </span>
  ));

  return (
    <div className="logo">
      <IndexLink className="logo__link" to="/">
        {letters}
      </IndexLink>
    </div>
  );
};

Logo.propTypes = {
  children: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
};

Logo.defaultProps = {
  children: 'Colorizr',
  colors: ['#F12509', '#D72031', '#CA1D45', '#BD1B59', '#B0186D', '#A31681', '#961395', '#8911A9'],
};

export default Logo;
