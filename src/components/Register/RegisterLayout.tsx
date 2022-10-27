import { PropsWithChildren } from 'react';

const RegisterLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className='h-screen flex items-center justify-center bg-white dark:bg-darkAccent
 text-black dark:text-white font-inter'
    >
      {children}
    </div>
  );
};

export default RegisterLayout;
