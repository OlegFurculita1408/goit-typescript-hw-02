import React from 'react';
import css from './Button.module.css';

type ButtonProps = {
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div className={css.ButtonContainer}>
      <button className={css.Button} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
export default Button;