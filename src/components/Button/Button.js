import React from 'react';
import '../../styles/variable.scss';
import './Button.scss';

const Button = props => {
  const { children, className, disabled, handleClick } = props;

  return (
    <div className="button">
      <button
        type="button"
        className={className}
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
