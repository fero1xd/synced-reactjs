import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonProps } from '../../utils/types/props';

const Button: React.FC<ButtonProps> = ({
  children,
  secondary,
  className,
  ...rest
}) => {
  const finalClassName = twMerge(
    `${
      secondary
        ? 'bg-red-600 disabled:bg-red-800'
        : 'bg-primaryBtn disabled:bg-blue-800'
    } font-semibold px-14 py-4 rounded-md flex items-center relative text-white ${
      secondary ? 'hover:bg-red-800' : 'hover:bg-primaryBtnHvr'
    } transition-colors duration-700 drop-shadow-lg`,
    className
  );

  return (
    <button {...rest} className={finalClassName}>
      {children}
    </button>
  );
};

export default Button;
