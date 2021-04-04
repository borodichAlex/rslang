import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Sprint from './games/Sprint/Sprint';
import GamePage from './pages/games/common/GamePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact>
          Пусто
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
