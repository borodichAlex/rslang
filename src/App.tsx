import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Menu from './shared/Menu/Menu';
import AudioChallenge from './pages/games/audioChallenge';

function App() {
  return (
    <div className="App">

      <Router>
        <Menu />
        <Switch>
          <Route exact path="/games/audioChallenge" component={AudioChallenge} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
