import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
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
import { apiUsers } from '../../utils/MainApi';
import { apiUsersMovies } from '../../utils/MainApiMovies';
import { apiMovies } from '../../utils/MoviesApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [winSize, setWinSize] = useState([0, 0]);
  const [isMenuPopupVisible, setIsMenuPopupVisible] = useState(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isBlackMessage, setIsBlackMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState({});
  const navigate = useNavigate();

  function menuPopupCloseButtonHandler() {
    setIsMenuPopupVisible(false);
  }

  function headerMenuButtonHandler() {
    setIsMenuPopupVisible(true);
  }

  function errorPopupCloseButtonHandler() {
    setIsErrorPopupVisible(false);
  }

  function openErrorPopup(message, isBlackMessage = false) {
    setIsBlackMessage(isBlackMessage);
    setErrorMessage(message);
    setIsErrorPopupVisible(true);
  }

  function logIn(password, email) {
    apiUsers
      .authorize(password, email)
      .then(userObject => {
        setCurrentUser(userObject);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => openErrorPopup(err));
  }

  function signUp(password, email, name) {
    apiUsers
      .register(password, email, name)
      .then(userObject => {
        logIn(password, email);
      })
      .catch(err => openErrorPopup(err));
  }

  useLayoutEffect(() => {
    function updateSize() {
      setTimeout(function () {
        setWinSize([window.innerWidth, window.innerHeight]);
      }, 500);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsLoading(true);
    apiMovies
      .getMovies()
      .then(allMovies => {
        setMovies(modifyMovies(allMovies));
      })
      .catch(err => openErrorPopup(err))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  function modifyMovies(moviesInitList) {
    return moviesInitList.map(movie => {
      return {
        movieId: movie.id,
        thumbnail: `${apiMovies.getBaseUrl()}${movie.image.formats.thumbnail.url}`,
        image: `${apiMovies.getBaseUrl()}${movie.image.url}`,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        country: movie.country,
        year: movie.year,
        duration: movie.duration,
        director: movie.director,
        description: movie.description,
        trailerLink: movie.trailerLink
      };
    });
  }

  useEffect(() => {
    getSavedMovies();
    // eslint-disable-next-line
  }, [loggedIn]);

  function getSavedMovies() {
    if (loggedIn) {
      apiUsersMovies
        .getAllMovies()
        .then(allMovies => {
          setSavedMovies(allMovies);
        })
        .catch(err => openErrorPopup(err));
    }
  }

  function addMovieToSavedList(movie) {
    const newMoviesList = savedMovies.slice();
    newMoviesList.push(movie);
    setSavedMovies(newMoviesList);
  }

  function deleteMovieFromSavedList(movie) {
    const index = savedMovies.findIndex(smovie => smovie.movieId === movie.movieId);
    if (index >= 0) {
      const newMoviesList = savedMovies.slice();
      newMoviesList.splice(index, 1);
      setSavedMovies(newMoviesList);
      return true;
    } else {
      return false;
    }
  }

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
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                headerMenuButtonHandler={headerMenuButtonHandler}
                winSize={winSize}
              />
            }
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
                    isLoading={isLoading}
                    movies={movies}
                    setIsLoading={setIsLoading}
                    addMovieToSavedList={addMovieToSavedList}
                    deleteMovieFromSavedList={deleteMovieFromSavedList}
                    winSize={winSize}
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
                    deleteMovieFromSavedList={deleteMovieFromSavedList}
                    winSize={winSize}
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
                    winSize={winSize}
                  />
                }
              />
            }
          />
          {!loggedIn && (
            <Route
              path="/signup"
              element={<Register signUp={signUp} />}
            />
          )}
          {!loggedIn && (
            <Route
              path="/signin"
              element={<Login logIn={logIn} />}
            />
          )}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
        {isMenuPopupVisible && <MenuPopup menuPopupCloseHandler={menuPopupCloseButtonHandler} />}
        {isErrorPopupVisible && (
          <ErrorPopup
            errorPopupCloseHandler={errorPopupCloseButtonHandler}
            errorMessage={errorMessage}
            isBlack={isBlackMessage}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
