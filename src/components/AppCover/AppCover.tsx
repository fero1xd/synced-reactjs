import React from 'react';
import { AppCoverProps } from '../../utils/types/props';
import AppProviders from './AppProviders';
import ToggleTheme from './ToggleTheme';

const AppCover: React.FC<AppCoverProps> = ({ children, ...rest }) => {
  return (
    <AppProviders {...rest}>
      <div className='h-screen bg-white dark:bg-darkAccent overflow-hidden relative dark:text-white transition-colors duration-300'>
        <ToggleTheme />
        {children}
      </div>
    </AppProviders>
  );
};

export default AppCover;
