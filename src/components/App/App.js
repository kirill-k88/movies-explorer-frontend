import { Routes } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header />
        <Routes></Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
