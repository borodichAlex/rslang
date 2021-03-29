import React from 'react';
import {
  Link,
} from '@material-ui/core';
import {
  Link as RouterLink,
} from 'react-router-dom';

import styles from './styles.module.css';

function Menu() {
  return (
    <div>

      <ul className={styles.list}>
        <li className={styles.item}>
          <Link
            className={styles.link}
            underline="none"
            component={RouterLink}
            to={{ pathname: '/games/sprint', state: { prevPath: '/menu' } }}
          >
            Спринт
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            className={styles.link}
            underline="none"
            component={RouterLink}
            to={{ pathname: '/games/audioChallenge', state: { prevPath: '/menu' } }}
          >
            Аудиовызов
          </Link>
        </li>
      </ul>

    </div>
  );
}

export default Menu;
