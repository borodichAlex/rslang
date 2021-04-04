import React, { useState } from 'react';
import {
  Link, IconButton, Typography, Button,
} from '@material-ui/core';
import { Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons';
import {
  Link as RouterLink,
} from 'react-router-dom';
import imgUser from './logo192.png';

import styles from './styles.module.css';

const Avatar = ({ urlImg }: {urlImg: string}) => (
  <img className={styles.avatar} src={urlImg} alt="avatar" />
);

const links = [
  {
    path: '/games/sprint',
    title: 'Спринт',
  },
  {
    path: '/games/audioChallenge',
    title: 'Аудио вызов',
  },
];

const authLinks = [
  {
    path: '/TextBook',
    title: 'Учебник',
  },
  {
    path: '/settings',
    title: 'Настройки',
  },
  {
    path: '/statistics',
    title: 'Статистика',
  },
];

function Menu() {
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleToggleMenu = () => {
    if (!isOpenMenu) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    setIsOpenMenu((is) => !is);
  };
  const handleToggleAuthUser = () => {
    setIsAuthUser((is) => !is);
  };

  return (
    <div className={`${styles.menu} ${isOpenMenu && styles.menuShow}`}>
      <IconButton className={styles.iconMenu} aria-label="toggle menu" onClick={handleToggleMenu}>
        {isOpenMenu ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <div className={styles.backdrop} />
      <div className={styles.body}>

        <div className={styles.wrapHeadingMenu}>
          <Typography className={styles.logo} variant="h4" component="h1" color="initial">RS Lang</Typography>
          {
            isAuthUser ? <Avatar urlImg={imgUser} />
            : (
                <Button variant="outlined" onClick={handleToggleAuthUser}>
                  <Link
                    className={styles.login}
                    underline="none"
                    component={RouterLink}
                    to={{ pathname: '/login', state: { prevPath: '/menu' } }}
                  />
                  Log In
                </Button>
              )
          }
        </div>
        <ul className={styles.list}>
          {
            links.map(({title, path}) => (
              <li key={title} className={styles.item}>
                <Link
                  className={styles.link}
                  underline="none"
                  component={RouterLink}
                  to={{ pathname: path, state: { prevPath: '/menu' } }}
                >
                  {title}
                </Link>
              </li>
            ))
          }
          {isAuthUser && (
            <>
              {
                authLinks.map(({title, path}) => (
                  <li key={title} className={styles.item}>
                    <Link
                      className={styles.link}
                      underline="none"
                      component={RouterLink}
                      to={{ pathname: path, state: { prevPath: '/menu' } }}
                    >
                      {title}
                    </Link>
                  </li>
                ))
              }
              <li className={styles.item}>
                <Link
                  onClick={handleToggleAuthUser}
                  className={styles.link}
                  underline="none"
                  component={RouterLink}
                  to={{ state: { prevPath: '/menu' } }}
                >
                  Log out
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

    </div>
  );
}

export default Menu;
