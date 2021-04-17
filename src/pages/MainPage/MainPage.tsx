/*eslint-disable */
import React from 'react';
import AboutTeam from '../../shared/AboutTeam/AboutTeam';
import Video from '../../shared/Video/Video';
import s from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={s.root}>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sint
        veritatis sequi consequuntur et libero inventore magnam voluptates nemo
        doloribus, dolore quos alias delectus doloremque expedita quidem
        voluptas illo distinctio?
      </div>
      <Video url="f4ioMGDQblI" />
      <AboutTeam />
    </div>
  );
};

export default MainPage;
