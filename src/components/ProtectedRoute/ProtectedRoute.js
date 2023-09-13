import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useContext } from 'react';

function ProtectedRoute({ element, winSize }) {
  const { loggedIn } = useContext(CurrentUserContext);
  if (loggedIn === undefined || winSize[0] === 0) {
    return;
  }
  return loggedIn ? (
    element
  ) : (
    <Navigate
      to="/"
      replace
    />
  );
}

export default ProtectedRoute;
