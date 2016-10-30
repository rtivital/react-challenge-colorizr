import React, { Component } from 'react';
import axios from 'axios';
import { Presets } from 'containers';

export default class ExplorePage extends Component {
  componentDidMount() {
    axios.get('/presets.json').then(response => console.log(response));
  }

  render() {
    return (
      <div><Presets /></div>
    );
  }
}
