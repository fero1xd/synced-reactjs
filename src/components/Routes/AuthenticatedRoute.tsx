import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Loader } from 'semantic-ui-react';
import { useEffect, useContext } from 'react';
import { SocketContext } from '../../utils/context/SocketContext';

const AuthenticatedRoute = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const socket = useContext(SocketContext);

  useEffect(() => {
    return () => {
      if (socket.connected) {
        console.log('disconnecting');
        socket.disconnect();
      }
    };
  }, []);

  if (loading) return <Loader active size='big' />;

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
