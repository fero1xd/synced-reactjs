import { InputFieldProps } from '../../utils/types/props';
import { twMerge } from 'tailwind-merge';

const Input: React.FC<InputFieldProps> = ({
  placeholder,
  type,
  className,
  formValidation,
  ...rest
}) => {
  const finalClassName = twMerge(
    'bg-white dark:bg-input shadow-md border border-[#e3e1e1] dark:border-darkAccent outline-none py-5 px-7 placeholder:opacity-50 rounded-sm focus:outline-primaryBtnHvr transition-all ease-in-out duration-500',
    className
  );

  return (
    <>
      <input
        type={type || 'text'}
        placeholder={placeholder}
        className={finalClassName}
        {...rest}
        {...formValidation?.register(formValidation.id, formValidation.options)}
      />
    </>
  );
};

export default Input;
