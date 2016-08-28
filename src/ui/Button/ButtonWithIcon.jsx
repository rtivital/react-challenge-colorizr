import React, { PropTypes } from 'react';
import cx from 'classnames';

import { Icon, glyphs } from '../Icon';
import Button from './Button';

const ButtonWithIcon = ({ glyph, children, className, ...others }) => (
  <Button className={cx('button--with-glyph', className)} {...others}>
    <span className="button__glyph"><Icon glyph={glyphs[glyph]} /></span>
    <span className="button__text">{children}</span>
  </Button>
);

ButtonWithIcon.propTypes = {
  glyph: PropTypes.oneOf(Object.keys(glyphs)).isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default ButtonWithIcon;
