import React from 'react';
import '../../styles/variable.scss';
import './Button.scss';

const Button = props => {
  const { children, className, disabled } = props;

  return (
    <div className="button">
      <button className={className} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};

export default Button;
