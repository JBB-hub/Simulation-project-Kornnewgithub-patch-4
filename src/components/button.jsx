import React from 'react';
import './button.css';

const Button_1 = () => {
  return (
    <div>
      <button className="btn-3">
        <span className="button__icon-wrapper">
          <svg className="button__icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            {/* ใส่ไอคอน SVG */}
          </svg>
        </span>
        Click Me
      </button>
    </div>
  );
};

export default Button_1;