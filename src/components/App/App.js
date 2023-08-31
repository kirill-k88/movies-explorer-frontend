import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { WindowSizeContext } from '../../contexts/WindowSizeContext.js';
import { useEffect, useLayoutEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    setCurrentUser({ name: 'Me' });
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
          <Header />
          <Routes>
            <Route
              path="/main"
              element={<Main />}
            />
            <Route
              path="/movies"
              element={<Movies />}
            />
          </Routes>
          <Footer />
        </div>
      </WindowSizeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
