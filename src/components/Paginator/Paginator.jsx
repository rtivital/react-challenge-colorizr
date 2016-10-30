import React, { Component, PropTypes, Children } from 'react';
import { chunk } from 'lodash';
import { Button } from 'ui';
import cx from 'classnames';
import './paginator.scss';

export default class Paginator extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    pagination: PropTypes.number,
    initialPage: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    pagination: 20,
    initialPage: 0,
  }

  chunk = chunk(Children.toArray(this.props.children), this.props.pagination)

  state = {
    page: this.props.initialPage,
  }

  setPage = (index) => {
    this.setState({ page: index });
  }

  nextPage = () => {
    const { page } = this.state;
    if (page < this.chunk.length - 1) {
      this.setState({ page: page + 1 });
    }
  }

  previosPage = () => {
    const { page } = this.state;
    if (page > 0) {
      this.setState({ page: page - 1 });
    }
  }

  render() {
    return (
      <div className="paginator">
        <div className={cx('paginator__inner', this.props.className)}>
          {this.chunk[this.state.page]}
        </div>

        <div className="paginator__controls">
          <Button className="paginator__button" onClick={this.previosPage}>Previous</Button>
          <Button className="paginator__button" onClick={this.nextPage}>Next</Button>
        </div>
      </div>
    );
  }
}
