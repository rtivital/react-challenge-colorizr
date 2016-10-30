import React, { Component } from 'react';
import axios from 'axios';

export default class ExplorePage extends Component {
  componentDidMount() {
    axios.get('/presets.json').then(response => console.log(response));
  }

  render() {
    return (
      <div>ExplorePage</div>
    );
  }
}
