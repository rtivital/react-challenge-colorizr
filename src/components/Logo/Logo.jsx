import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { random } from 'lodash';
import './logo.scss';

const baseColors = [
  ['#F12509', '#D72031', '#CA1D45', '#BD1B59', '#B0186D', '#A31681', '#961395', '#8911A9'],
  ['#074C6C', '#095B82', '#0A6B97', '#0C7AAD', '#0C7AAD', '#0D89C3', '#0F99D9', '#13C6FF'],
  ['#E6BF0E', '#D0B219', '#BAA624', '#A49A2F', '#8E8D3A', '#788146', '#627551', '#4C685C'],
  ['#1DB718', '#2FBC17', '#41C116', '#53C615', '#66CC14', '#78D112', '#8AD611', '#8AD611'],
  ['#9D18BA', '#AD2A94', '#B53381', '#BD3C6E', '#C5455A', '#CD4E47', '#D55734', '#DD6021'],
];

const logoColors = baseColors.reduce((result, pallete) => {
  result.push(pallete.slice(0));
  result.push(pallete.slice(0).reverse());
  return result;
}, []);

export default class Logo extends Component {
  static propTypes = {
    children: PropTypes.string,
  }

  static defaultProps = {
    children: 'Colorizr',
  }

  state = { colors: logoColors[0] }
  interval = null

  componentWillMount() {
    this.applyInterval();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  applyColors = () => {
    const pallete = logoColors[random(0, logoColors.length - 1)];
    this.setState({ colors: pallete });
  }

  applyInterval = () => {
    this.clearInterval();
    this.interval = setInterval(this.applyColors, 2500);
  }

  clearInterval = () => {
    clearInterval(this.interval);
  }

  render() {
    const { colors } = this.state;

    const letters = this.props.children.split('').map((letter, index) => (
      <span
        className="logo__letter"
        style={{ color: colors[index] }}
        key={`${letter}-${index}`}
      >
        {letter}
      </span>
    ));

    return (
      <div className="logo">
        <IndexLink
          to="/"
          className="logo__link"
          onMouseEnter={this.clearInterval}
          onMouseLeave={this.applyInterval}
        >
          {letters}
        </IndexLink>
      </div>
    );
  }
}
