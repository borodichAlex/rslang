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
  console.log('Statistics');

  const history = useHistory();
  console.log({ history });
  console.log(history.location);

  useEffect(() => {
    history.push(history.location.pathname);
  }, []);

  return (
    <div className={styles.root}>
      <Typography variant="h2" component="h2" color="initial">Статистика</Typography>
      <ShortStatistics data={dataShort} />
      {/* <LongStatistics data={dataLong} /> */}
    </div>
  );
};

export default Statistics;
