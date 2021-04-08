import React, { useState, FC, useEffect } from 'react';
import {
  Link, IconButton, Typography, Button, ButtonGroup,
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

const Menu: FC = () => {
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

  useEffect(() => {
    const handleClick = (e: any) => {
      const element = e.target;

      if (element.id === 'backdropMenu') {
        handleToggleMenu();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div className={`${styles.menu} ${isOpenMenu && styles.menuShow}`}>
      <IconButton className={styles.iconMenu} aria-label="toggle menu" onClick={handleToggleMenu}>
        {isOpenMenu ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <div className={styles.backdrop} id="backdropMenu" />
      <div className={styles.body}>

        <div className={styles.wrapHeadingMenu}>
          <Link
            underline="none"
            component={RouterLink}
            to={{ pathname: '/', state: { prevPath: '/menu' } }}
          >
            <Typography className={styles.logo} variant="h4" component="h1" color="initial">RS Lang</Typography>
          </Link>
          {
            isAuthUser ? <Avatar urlImg={imgUser} />
            : (
              <ButtonGroup variant="outlined" aria-label="auth">
                <Button
                  style={{whiteSpace: 'nowrap'}}
                  component={RouterLink}
                  to={{ pathname: '/login' }}
                >
                  Log In
                </Button>
                <Button
                  style={{whiteSpace: 'nowrap'}}
                  component={RouterLink}
                  to={{ pathname: '/registration' }}
                >
                  Sign up
                </Button>
              </ButtonGroup>
              )
          }
        </div>
        <ul className={styles.list}>
          {
            links.map(({ title, path }) => (
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
                authLinks.map(({ title, path }) => (
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
                  // onClick={handleToggleAuthUser}
                  className={styles.link}
                  underline="none"
                  component={RouterLink}
                  to={{ state: { prevPath: '/menu' } }}
                >
                  Выйти
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

    </div>
  );
};

export default Menu;
