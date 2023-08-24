import './App.css';

function App() {
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
