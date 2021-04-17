import React, {
  FC, useState, useLayoutEffect,
} from 'react';
import {
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from './shared/Menu';
import Loader from './shared/Loader';
import Footer from './shared/Footer/Footer';
import TextBook from './pages/TextBook/TextBook';
import Auth from './pages/Auth';
import { RootState } from './redux/store';
import checkAuthUser from './utils/checkAuthUser';
import styles from './stylesApp.module.css';
import Games from './pages/games';
import MainPage from './pages/MainPage/MainPage';
import Statistics from './pages/StatisticsPage';

const App: FC = () => {
  const dispatch = useDispatch();
  const isAuthUser = useSelector((store: RootState) => store.user.isAuth);

  const [isCheckedAuth, setIsCheckedAuth] = useState(false);

  const history = useHistory();

  useLayoutEffect(() => {
    checkAuthUser(dispatch).then(() => {
      if (!isAuthUser && (
        history.location.pathname === '/signin' || history.location.pathname === '/signup'
        )
      ) {
        history.push('/');
      }

      setIsCheckedAuth(true);
    });
  }, []);

  return (!isCheckedAuth) ? <Loader /> : (
    <div className={styles.root}>
      <Menu />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/games" component={Games} />
          <Route path="/textbook" component={TextBook} />
          <Route path="/statistics" component={Statistics} />
          {
            !isAuthUser && (
                <>
                  <Route path="/signin" component={Auth.LogIn} />
                  <Route path="/signup" component={Auth.SignUp} />
                </>
              )
          }
        </Switch>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default App;
