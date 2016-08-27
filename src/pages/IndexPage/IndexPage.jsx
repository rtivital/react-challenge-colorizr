import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { colorActions } from 'app/actions';
import { ColorPicker } from 'app/components/ColorPicker';

import './index-page.scss';

const IndexPage = ({ setLeadColor }) => (
  <div className="page">
    <ColorPicker defaultColor="red" onChange={setLeadColor} />
  </div>
);

IndexPage.propTypes = {
  setLeadColor: PropTypes.func.isRequired,
};

export default connect(null, colorActions)(IndexPage);
