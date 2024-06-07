import React from "react";
import './Button.css'
const Button = ({title , onclick , type }) => {
  return <button className="button-wrapper" onClick={onclick} type={type}>{title}</button>;
};

export default Button;
