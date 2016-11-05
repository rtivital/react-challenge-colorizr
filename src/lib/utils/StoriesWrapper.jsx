import React, { PropTypes } from 'react';

const styles = {
  minHeight: '50vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const StoriesWrapper = ({ children }) => (
  <div className="story" style={styles}>{children}</div>
);

StoriesWrapper.propTypes = {
  children: PropTypes.any.isRequired,
};

export default StoriesWrapper;
