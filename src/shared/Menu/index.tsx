import React, { useState, FC, useEffect } from 'react';
import {
  Link, IconButton, Typography, Button, ButtonGroup,
} from '@material-ui/core';
import {
  Link as RouterLink,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from '../../redux/user/actions';
import { RootState } from '../../redux/store';

import styles from './styles.module.css';
import './styles.css';
import { deleteUserId } from '../../utils/UserUtils';
import { deleteAccessToken, deleteRefreshToken } from '../../utils/TokenUtils';

const Avatar = ({ urlImg, name }: {urlImg: string, name: string}) => (
  <img className={styles.avatar} src={urlImg} alt={`avatar ${name}`} title={name} />
);

const links = [
  {
    path: '/',
    title: 'Главная',
  },
  {
    path: '/games/sprint',
    title: 'Спринт',
  },
  {
    path: '/games/audioChallenge',
    title: 'Аудио вызов',
  },
  {
    path: '/games/wordConstructor',
    title: 'Конструктор слов',
  },
  {
    path: '/games/savanna',
    title: 'Саванна',
  },
];

const authLinks = [
  {
    path: '/TextBook',
    title: 'Учебник',
  },
  {
    path: '/statistics',
    title: 'Статистика',
  },
];

const removeActiveClassInList = (
  listNode: HTMLUListElement | HTMLMenuElement,
  className: string,
) => {
  const activeEl = Array.from(listNode.children)
    .find((el: Element) => el.classList.contains(className));
  activeEl && activeEl.classList.remove(className);
};

const Menu: FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleToggleMenu = () => {
    if (!isOpenMenu) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    setIsOpenMenu((is) => !is);
  };

  const location = useLocation();
  const history = useHistory();

  const dispatchUser = useDispatch();

  const {
    isAuth: isAuthUser, avatar, name: userName,
  } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    const activeClass = 'item--active';
    const menuList: HTMLUListElement | HTMLMenuElement | null = document.querySelector('#menu-list');

    if (menuList !== null) {
      const elem = Array.from(menuList.children).find((el) => el.firstElementChild?.getAttribute('href') === location.pathname);

      if (elem) {
        if (!(elem.classList.contains(activeClass))) {
          removeActiveClassInList(menuList, activeClass);
          elem.classList.add(activeClass);
        }
        if (elem.children[0].textContent === 'Выйти') {
          elem.classList.remove(activeClass);
        }
      } else {
        removeActiveClassInList(menuList, activeClass);
      }
    }
  }, [location]);

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
    <div className={`${styles.menu} ${isOpenMenu && styles.menuShow}`} id="menu">
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
            isAuthUser ? <Avatar urlImg={avatar} name={userName} />
            : (
              <ButtonGroup variant="outlined" aria-label="auth">
                <Button
                  style={{ whiteSpace: 'nowrap' }}
                  component={RouterLink}
                  to={{ pathname: '/signin' }}
                >
                  Log In
                </Button>
                <Button
                  style={{ whiteSpace: 'nowrap' }}
                  component={RouterLink}
                  to={{ pathname: '/signup' }}
                >
                  Sign up
                </Button>
              </ButtonGroup>
              )
          }
        </div>
        <ul className={styles.list} id="menu-list">
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
              {authLinks.map(({ title, path }) => (
                <li key={title} className={styles.item}>
                  <Link
                    className={styles.link}
                    underline="none"
                    component={RouterLink}
                    to={{
                      pathname: path,
                      state: {
                        prevPath: '/menu',
                      },
                    }}
                  >
                    {title}
                  </Link>
                </li>
              ))}
              <li className={styles.item}>
                <Link
                  onClick={() => {
                    deleteUserId();
                    deleteRefreshToken();
                    deleteAccessToken();
                    dispatchUser(userLogOut());
                    history.push('/');
                  }}
                  className={styles.link}
                  underline="none"
                  component={RouterLink}
                  to={{ pathname: '/', state: { prevPath: '/menu' } }}
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
