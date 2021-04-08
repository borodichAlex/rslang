import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import GamePage from './pages/games/common/GamePage';
import Menu from './shared/Menu';
import {
  Game as AudioChallenge,
  description as DataAudioChallenge,
} from './pages/games/audioChallenge';
import Sprint from './pages/games/Sprint/Sprint';
import { sprintData } from './helpers/gamesData';
import styles from './stylesApp.module.css';
import Footer from './shared/Footer/Footer';
import Auth from './pages/Auth';

const App: FC = () => (
  <Router>
    <div className={styles.root}>
      <Menu />
      <div className={styles.content}>
        <Route exact path="/games/audioChallenge">
          <GamePage Game={AudioChallenge} dataGame={DataAudioChallenge} />
        </Route>
        <Route path="/games/sprint">
          <GamePage dataGame={sprintData} Game={Sprint} />
        </Route>
        <Route path="/login" component={Auth.LogIn} />
        <Route path="/registration" component={Auth.SignUp} />
        <Footer />
      </div>
    </div>
  </Router>
);

export default App;
