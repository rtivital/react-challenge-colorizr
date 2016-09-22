import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import { ColorPicker } from 'components';

@onClickOutside
export default class ColorSelectionControl extends Component {
  static propTypes = {
    selectionColor: PropTypes.string.isRequired,
  }

  state = { opened: false }
  toggleColorPicker = () => { this.setState({ opened: !this.state.opened }); }
  handleClickOutside = () => { this.setState({ opened: false }); }

  render() {
    return (
      <div className="color-display-group__mixer">
        <button
          className="color-display-group__picker-toggle"
          style={{ backgroundColor: this.props.selectionColor }}
          onClick={this.toggleColorPicker}
        />

        {do {
          if (this.state.opened) {
            <ColorPicker
              {...this.props}
              defaultColor={this.props.selectionColor}
              className="color-display-group__color-picker"
            />;
          }
        }}
      </div>
    );
  }
}
