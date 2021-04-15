import React, { FC, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GamePage from './pages/games/common/GamePage';
import Menu from './shared/Menu';
import {
  Game as AudioChallenge,
  description as DataAudioChallenge,
} from './pages/games/audioChallenge';
import Sprint from './pages/games/Sprint/Sprint';
import { sprintData } from './helpers/gamesData';
import Footer from './shared/Footer/Footer';
import Auth from './pages/Auth';
import styles from './stylesApp.module.css';
import checkAuthUser from './utils/checkAuthUser';
import { RootState } from './redux/store';

const App: FC = () => {
  const dispatch = useDispatch();
  const isAuthUser = useSelector((store: RootState) => store.user.isAuth);

  useEffect(() => {
    checkAuthUser(dispatch);
  }, []);

  return (
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
          {
            !isAuthUser ? (
                <>
                  <Route path="/signin" component={Auth.LogIn} />
                  <Route path="/signup" component={Auth.SignUp} />
                </>
              )
            : <Redirect to="/" />
          }
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
