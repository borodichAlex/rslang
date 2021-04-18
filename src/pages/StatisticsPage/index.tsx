import React, { FC, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import LongStatistics from './components/Long';
import ShortStatistics from './components/Short';

import styles from './styles.module.css';

const dataShort = {

};

const dataLong = {

};

type IProps = {

};

const Statistics: FC<IProps> = () => {
  const history = useHistory();
  useEffect(() => {
    history.push(history.location.pathname);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Typography variant="h2" component="h2" color="initial" className={styles.mainHeading}>Статистика</Typography>
        <ShortStatistics data={dataShort} />
        {/* <LongStatistics data={dataLong} /> */}
      </div>
    </div>
  );
};

export default Statistics;
