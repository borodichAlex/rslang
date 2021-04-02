import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import styles from './styles.module.css';

function ToggleFullScreen() {
  const [isFull, setIsFull] = useState(false);
  const handleClick = () => {
    setIsFull((state) => !state);

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <IconButton className={styles.icon} aria-label="fullScreen" onClick={handleClick}>
      {isFull ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
  );
}

export default ToggleFullScreen;
