// import PropTypes from 'prop-types';
// import css from './Button.module.css'

// function Button ({ onClick }) {
//     return (
//         <div className={css.ButtonConatainer}>
//             <button className={css.Button} type='button' onClick={onClick}>
//                 Load more
//             </button>
//         </div>
//     )
// }
// Button.propTypes = {
//     onClick: PropTypes.func.isRequired,
// }
// export default Button

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