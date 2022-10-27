import AuthContext from '../../utils/context/AuthContext';
import ThemeProvider from '../../utils/providers/ThemeProvider';
import { AppProvidersProps } from '../../utils/types/props';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ModalContext from '../../utils/context/ModalContext';
import { SocketContext } from '../../utils/context/SocketContext';
import { socket } from '../../utils/context/SocketContext';

const AppProviders: React.FC<AppProvidersProps> = ({
  children,
  user,
  setUser,
  modals,
  setModals,
}) => {
  return (
    <SocketContext.Provider value={socket}>
      <ThemeProvider initialTheme='dark'>
        <ModalContext.Provider value={{ modals, setModals }}>
          <AuthContext.Provider value={{ user, updateUser: setUser }}>
            {children}
          </AuthContext.Provider>
          <ReactQueryDevtools />
        </ModalContext.Provider>
      </ThemeProvider>
    </SocketContext.Provider>
  );
};

export default AppProviders;
