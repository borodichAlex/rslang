import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';

import styles from '../../styles.module.css';

// - за текущий день
// - количество изученных слов
// - процент правильных ответов и самая длинная серия правильных ответов
// по каждой мини-игре отдельно
// - общее количество изученных слов и процент правильных ответов за день

type IDataShortStatistics = {

};

type IProps = {
  data: IDataShortStatistics;
};

const ShortStatistics: FC<IProps> = ({ data }: IProps) => {
  console.log({ data });

  return (
    <div className={`${styles.block}`}>
      <Typography variant="h3" component="h2" color="initial">Статистика за сегодня</Typography>

    </div>
  );
};

export default ShortStatistics;
