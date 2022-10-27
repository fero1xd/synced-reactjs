import { PropsWithChildren } from 'react';

const HomeLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='px-4 md:px-0 lg:px-0 w-[600px] mx-auto flex items-center justify-center flex-col h-full pt-20'>
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
