import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Sprint from './games/Sprint/Sprint';
import { sprintData } from './helpers/gamesData';
import GamePage from './pages/games/common/GamePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/games/sprint">
          <GamePage dataGame={sprintData} Game={Sprint} />
        </Route>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
