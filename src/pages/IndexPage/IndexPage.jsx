import React from 'react';
import { ColorPicker } from 'app/components/ColorPicker';
import { ColorDisplay } from 'app/components/ColorDisplay';
import './index-page.scss';

const IndexPage = () => (
  <div className="page">
    <ColorPicker defaultColor="red" />
    <ColorDisplay color="#cfd" />
  </div>
);

export default IndexPage;
