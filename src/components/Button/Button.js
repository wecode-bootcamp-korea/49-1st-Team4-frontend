import React from 'react';
import '../../styles/variable.scss';
import './Button.scss';

const Button = props => {
  const { children, className, scale, shape, disabled, handleClick } = props;

  return (
    <div className="button">
      <button
        type="button"
        className={className}
        scale={scale}
        shape={shape}
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
