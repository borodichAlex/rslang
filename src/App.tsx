import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GamePage from './pages/games/common/GamePage';
import Menu from './shared/Menu';
import {
  Game as AudioChallenge,
  description as DataAudioChallenge,
} from './pages/games/audioChallenge';
import Sprint from './pages/games/Sprint/Sprint';
import { sprintData, wordConstructorData } from './helpers/gamesData';
import styles from './stylesApp.module.css';
import Footer from './shared/Footer/Footer';
import WordConstructor from './pages/games/wordConstructor';

function App() {
  return (
    <Router>
      <div className={styles.root}>
        <Menu />
        <div className={styles.content}>
          <Switch>
            <Route exact path="/games/audioChallenge">
              <GamePage Game={AudioChallenge} dataGame={DataAudioChallenge} />
            </Route>
            <Route path="/games/sprint">
              <GamePage dataGame={sprintData} Game={Sprint} />
            </Route>
            <Route path="/games/wordConstructor">
              <GamePage dataGame={wordConstructorData} Game={WordConstructor} />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
