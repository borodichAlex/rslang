import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import GamePage from './pages/games/common/GamePage';
import Menu from './shared/Menu';
import {
  Game as AudioChallenge,
  description as DataAudioChallenge,
} from './pages/games/audioChallenge';
import styles from './stylesApp.module.css';

function App() {
  return (
    <Router>
      <div className={styles.root}>
        <Route path="/" component={Menu} />
        <div className={styles.content}>
          <Switch>
            <Route exact path="/games/audioChallenge">
              <GamePage Game={AudioChallenge} dataGame={DataAudioChallenge} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
