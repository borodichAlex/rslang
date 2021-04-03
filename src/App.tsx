import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Sprint from './games/Sprint/Sprint';
import GamePage from './pages/games/common/GamePage';

const dataGame = {
  name: 'Sprint',
  goal: 'Выв',
  description: 'string',
  bg: 'blue',
  amountWords: 20,
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact>
          <GamePage Game={Sprint} dataGame={dataGame} />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
