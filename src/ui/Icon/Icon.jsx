import React, { PropTypes } from 'react';
import cx from 'classnames';
import './icon.scss';

const Icon = ({ glyph, theme }) => (
  <svg
    className={cx('icon', {
      'icon--light': theme === 'light',
      'icon--dark': theme === 'dark',
    })}
    dangerouslySetInnerHTML={{ __html: `<use xlink:href="${glyph}"></use>` }}
  />
);

Icon.propTypes = {
  glyph: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

Icon.defaultProps = {
  theme: 'dark',
};

export default Icon;