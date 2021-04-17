import React from 'react';
import useWindowDimensions from './useWindowDimensions';
import s from './video.module.scss';

const Video = ({ url }: { url: string }) => {
  const URL = `https://www.youtube.com/embed/${url}`;
  const { height, width } = useWindowDimensions();
  const playerWidth = width > 1000 ? '800px' : width / 1.5;
  const playerHeight = width < 500 ? height / 2.6 : '500px';
  return (
    <div className={s.video}>
      <iframe
        className={s.video}
        width={playerWidth}
        height={playerHeight}
        src={URL}
        title="About our App"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Video;
