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
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const handleToggleMenu = () => {
    setIsOpenMenu((is) => !is);
  };
  const handleToggleAuthUser = () => {
    setIsAuthUser((is) => !is);
  };

  return (
    <div className={styles.wrapper}>
      <IconButton className={styles.iconMenu} id="toggleMenu" aria-label="toggle menu" onClick={handleToggleMenu}>
        {isOpenMenu ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <div className={`${styles.menu} ${!isOpenMenu && styles.menuHide}`}>
        <div className={styles.wrapHeadingMenu}>
          <Typography className={styles.logo} variant="h4" component="h1" color="initial">RS Lang</Typography>
          {
            isAuthUser ? <Avatar urlImg={imgUser} />
            : (
                <Button variant="outlined" color="default" onClick={handleToggleAuthUser}>
                  <Link
                    className={styles.link}
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
              <li className={styles.item}>
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
                  <li className={styles.item}>
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
                <Button onClick={handleToggleAuthUser}>
                  Log out
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
