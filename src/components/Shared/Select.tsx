import { twMerge } from 'tailwind-merge';
import { FC } from 'react';
import { SelectProps } from '../../utils/types/props';

const Select: FC<SelectProps> = ({
  children,
  className,
  formValidation,
  ...rest
}) => {
  const finalClassName = twMerge(
    'bg-white dark:bg-input w-full py-5 px-7 outline-none border-none focus:outline-primaryBtnHvr transition-all ease-in-out duration-500 rounded-sm',
    className
  );
  return (
    <select
      {...rest}
      {...formValidation?.register(formValidation.id, formValidation.options)}
      className={finalClassName}
    >
      {children}
    </select>
  );
};

export default Select;
