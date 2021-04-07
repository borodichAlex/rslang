import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import styles from './styles.module.css';

function ToggleFullScreen() {
  const [isFull, setIsFull] = useState(false);

  const handleToggleFullScreen = () => {
    setIsFull((is) => !is);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }

    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && document.exitFullscreen) {
        setIsFull(false);
      }
    });

    return () => {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
      }
    };
  }, []);

  return (
    <IconButton className={styles.icon} aria-label="fullScreen" onClick={handleToggleFullScreen}>
      {isFull ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
  );
}

export default ToggleFullScreen;
