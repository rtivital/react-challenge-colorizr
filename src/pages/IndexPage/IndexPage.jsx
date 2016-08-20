import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { colorActions } from 'app/actions';
import { ColorPicker } from 'app/components/ColorPicker';
import { ColorDisplay } from 'app/components/ColorDisplay';

import './index-page.scss';

const IndexPage = ({ color, setLeadColor }) => (
  <div className="page">
    <ColorPicker defaultColor="red" onChange={setLeadColor} />
    <ColorDisplay colorValue={color} />
  </div>
);

IndexPage.propTypes = {
  color: PropTypes.string.isRequired,
  setLeadColor: PropTypes.func.isRequired,
};

export default connect(
  state => ({ color: state.color.lead }),
  colorActions
)(IndexPage);
