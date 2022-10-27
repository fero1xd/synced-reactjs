import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Loader } from 'semantic-ui-react';

const PublicRoute = () => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <Loader active size='big' />;

  if (user) {
    return <Navigate to='/home' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
