import React, { PropTypes } from 'react';

const Icon = ({ glyph }) => (
  <svg
    className="icon"
    dangerouslySetInnerHTML={{ __html: `<use xlink:href="${glyph}"></use>` }}
  />
);

Icon.propTypes = { glyph: PropTypes.string.isRequired };

export default Icon;
