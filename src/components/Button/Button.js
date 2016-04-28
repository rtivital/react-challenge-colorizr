import React from 'react';
import './button.scss';

const Button = (props) => {
  return <button className={`btn btn__${props.btnType}`} onClick={props.onClick}>{props.children}</button>;
};

export default Button;
