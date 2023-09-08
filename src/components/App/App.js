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
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import { apiUsers } from '../../utils/ApiUsers';
import { apiUsersMovies } from '../../utils/ApiUsersMovies';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [size, setSize] = useState([0, 0]);
  const [isMenuPopupVisible, setIsMenuPopupVisible] = useState(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);

  function menuPopupCloseButtonHandler() {
    setIsMenuPopupVisible(false);
  }

  function headerMenuButtonHandler() {
    setIsMenuPopupVisible(true);
  }

  function errorPopupCloseButtonHandler() {
    setIsErrorPopupVisible(false);
  }

  function openErrorPopup(message) {
    setErrorMessage(message);
    setIsErrorPopupVisible(true);
  }

  useLayoutEffect(() => {
    function updateSize() {
      setTimeout(function () {
        setSize([window.innerWidth, window.innerHeight]);
      }, 500);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loggedIn) {
      apiUsersMovies
        .getAllMovies()
        .then(allMovies => {
          setSavedMovies(allMovies);
        })
        .catch(err => openErrorPopup(err));
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  useEffect(() => {
    apiUsers
      .getUserInfo()
      .then(user => {
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .catch(err => console.log(err));
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
                  element={
                    <Movies
                      headerMenuButtonHandler={headerMenuButtonHandler}
                      openErrorPopup={openErrorPopup}
                      savedMovies={savedMovies}
                    />
                  }
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={
                    <SavedMovies
                      headerMenuButtonHandler={headerMenuButtonHandler}
                      openErrorPopup={openErrorPopup}
                      savedMovies={savedMovies}
                      setSavedMovies={setSavedMovies}
                    />
                  }
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={
                    <Profile
                      headerMenuButtonHandler={headerMenuButtonHandler}
                      openErrorPopup={openErrorPopup}
                      setCurrentUser={setCurrentUser}
                      setLoggedIn={setLoggedIn}
                    />
                  }
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  openErrorPopup={openErrorPopup}
                  setCurrentUser={setCurrentUser}
                  setLoggedIn={setLoggedIn}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  openErrorPopup={openErrorPopup}
                  setCurrentUser={setCurrentUser}
                  setLoggedIn={setLoggedIn}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {isMenuPopupVisible && <MenuPopup menuPopupCloseHandler={menuPopupCloseButtonHandler} />}
          {isErrorPopupVisible && (
            <ErrorPopup
              errorPopupCloseHandler={errorPopupCloseButtonHandler}
              errorMessage={errorMessage}
            />
          )}
        </div>
      </WindowSizeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
