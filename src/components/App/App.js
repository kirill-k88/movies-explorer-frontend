import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { WindowSizeContext } from '../../contexts/WindowSizeContext.js';
import { useEffect, useLayoutEffect, useState } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import MenuPopup from '../MenuPopup/MenuPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [size, setSize] = useState([0, 0]);
  const [isMenuPopupVisible, setIsMenuPopupVisible] = useState(false);

  function menuPopupCloseButtonHandler() {
    setIsMenuPopupVisible(false);
  }

  function headerMenuButtonHandler() {
    setIsMenuPopupVisible(true);
  }

  useEffect(() => {
    //временная заглушка для проверки отображения
    setCurrentUser({ name: 'Кирилл', email: 'kirill@ya.ru' });
    setLoggedIn(true);
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
    // eslint-disable-next-line
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn }}>
      <WindowSizeContext.Provider value={size}>
        <div className="app">
          <Routes>
            <Route
              path="/main"
              element={<Main headerMenuButtonHandler={headerMenuButtonHandler} />}
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={<Movies headerMenuButtonHandler={headerMenuButtonHandler} />}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={<SavedMovies headerMenuButtonHandler={headerMenuButtonHandler} />}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={<Profile headerMenuButtonHandler={headerMenuButtonHandler} />}
                />
              }
            />
            <Route
              path="/signup"
              element={<Register />}
            />
            <Route
              path="/signin"
              element={<Login />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
          {isMenuPopupVisible && <MenuPopup menuPopupCloseHandler={menuPopupCloseButtonHandler} />}
        </div>
      </WindowSizeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
