import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AboutTeam from './Components/AboutTeam/AboutTeam';
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
        <Route path="/" exact>
          <AboutTeam />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
