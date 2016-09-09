import React, { PropTypes } from 'react';
import { v4 } from 'node-uuid';
import cx from 'classnames';

const Checkbox = ({ checked, onChange, className, label }) => {
  const id = v4();

  return (
    <div className={cx('checkbox', className)}>
      <input
        className="checkbox__input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
      />

      <label className="checkbox__label" htmlFor={id}>{label}</label>
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox;
