import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { WindowSizeContext } from '../../contexts/WindowSizeContext.js';
import { useEffect, useLayoutEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import MenuPopup from '../MenuPopup/MenuPopup';

function App() {
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
    setCurrentUser({ name: 'Виталий', email: 'kirill@ya.ru' });
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
    <CurrentUserContext.Provider value={currentUser}>
      <WindowSizeContext.Provider value={size}>
        <div className="app">
          <Routes>
            <Route
              path="/main"
              element={
                <>
                  <Header headerMenuButtonHandler={headerMenuButtonHandler} /> <Main /> <Footer />
                </>
              }
            />
            <Route
              path="/movies"
              element={
                <>
                  <Header headerMenuButtonHandler={headerMenuButtonHandler} />
                  <Movies /> <Footer />
                </>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <>
                  <Header headerMenuButtonHandler={headerMenuButtonHandler} />
                  <SavedMovies /> <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header headerMenuButtonHandler={headerMenuButtonHandler} />
                  <Profile />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Register />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {isMenuPopupVisible && <MenuPopup menuPopupCloseHandler={menuPopupCloseButtonHandler} />}
        </div>
      </WindowSizeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
