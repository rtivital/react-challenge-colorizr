import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import color from 'color';
import cx from 'classnames';

import { ColorPicker } from 'app/containers';
import { Container } from 'app/ui';
import './index-page.scss';

@connect(state => ({ lead: state.color.lead }))
export default class IndexPage extends PureComponent {
  static propTypes = {
    lead: PropTypes.string.isRequired,
  }

  render() {
    const luminosity = color(this.props.lead).luminosity();
    const titlesClassName = cx('header__titles', {
      'header__titles--dark': luminosity >= 0.5,
      'header__titles--light': luminosity < 0.5,
    });

    return (
      <div className="page">
        <header className="header" style={{ backgroundColor: this.props.lead }}>
          <Container className="header__inner">
            <div className={titlesClassName}>
              <h1 className="header__title">
                The last color service you will ever need
              </h1>
              <h2 className="header__subtitle">
                Just pick one color and let the magic happen
              </h2>
            </div>
            <div className="header__color-picker">
              <ColorPicker />
            </div>
          </Container>
        </header>
      </div>
    );
  }
}
