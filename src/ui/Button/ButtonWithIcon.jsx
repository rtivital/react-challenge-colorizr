import React, { PropTypes } from 'react';
import { Icon, glyphs } from '../Icon';
import Button from './Button';

const ButtonWithIcon = ({ glyph, children, ...others }) => (
  <Button {...others}>
    <span className="button__glyph"><Icon glyph={glyphs[glyph]} /></span>
    <span className="button__text">{children}</span>
  </Button>
);

ButtonWithIcon.propTypes = {
  glyph: PropTypes.oneOf(Object.keys(glyphs)).isRequired,
  children: PropTypes.any,
};

export default ButtonWithIcon;
