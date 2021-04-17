import React, { FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader: FC = () => {
  const style = {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={style}>
      <CircularProgress size="20" style={{width: '10vw'}} />
    </div>
  );
};

export default Loader;
