import React from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { IconButton } from '@material-ui/core';
import styles from './styles.module.css';

type IProps = {
  word: string;
  imageUrl: string;
  isSelectedAnswer: boolean;
  onPlayAudio: () => void;
};

const RightWord = ({
  word,
  imageUrl,
  isSelectedAnswer,
  onPlayAudio,
}: IProps) => (
  <div className={styles.root}>
    {isSelectedAnswer && <img className={styles.img} src={imageUrl} alt={word} />}
    <div className={styles.wrapWord}>
      <IconButton
        className={`${styles.icon} ${!isSelectedAnswer && styles.iconLarge}`}
        aria-label="play audio"
        onClick={() => onPlayAudio()}
      >
        <VolumeUpIcon />
      </IconButton>
      {isSelectedAnswer && <h3 className={styles.word}>{word}</h3>}
    </div>
  </div>
);
export default RightWord;
