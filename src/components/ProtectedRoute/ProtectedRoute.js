import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useContext } from 'react';

function ProtectedRoute({ element }) {
  const { loggedIn } = useContext(CurrentUserContext);
  return loggedIn ? element : <Navigate to="/" replace />;
}

export default ProtectedRoute;
