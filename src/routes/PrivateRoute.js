import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  let { user, loggedIn } = useContext(AuthContext);
  const location = useLocation();

  if (!user && !loggedIn) {
    return <Navigate to={`/login?returnUrl=${location.pathname}`} />;
  }
  return children;
};

export default PrivateRoute;
