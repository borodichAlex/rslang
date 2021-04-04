import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Sprint from './games/Sprint/Sprint';
import { sprintData } from './helpers/gamesData';
import GamePage from './pages/games/common/GamePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact>
          <GamePage dataGame={sprintData} Game={Sprint} />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
