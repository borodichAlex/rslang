/*eslint-disable */
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import AboutTeam from '../../shared/AboutTeam/AboutTeam';
import Video from '../../shared/Video/Video';
import s from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={s.root}>
      <div className={s.info}>
        <Typography variant="h3" component="h2" className={s.description}>
        RS Lang - это приложение, которое поможет тебе изучить английский язык
        в игровой форме.
        </Typography>
        <Typography variant="h4" component="h3" className={s.description}>
          У тебя будет возможность, прокачать свой лексический
        запас английского с удовольствием, для этого в приложении есть такие
        игры как: Спринт, Саванна, Аудиовызов и Конструктор слов, благодаря
        которым ты узнашь много новых слов.
        </Typography>
        <Typography variant="h4" component="h3" className={s.description}>
        Выбор уровня сложности в каждой
        игре поможет освоиться как новичку так и мастеру английского. А также
        ты сможешь наблюдать за своим прогрессом в разделе "Статистика".
        </Typography>
        <Typography
          variant="h4"
          component="h4"
          style={{ marginTop: '40px'}}
        >
        Изучай английский с удовольствием!
        </Typography>

        <Video url="HAr6_hjiDk0" />

        <Typography variant="h2" component="h3" className={s.ourTeam}>
          Наша команда
        </Typography>
        <AboutTeam />
      </div>
    </div>
  );
};

export default MainPage;
