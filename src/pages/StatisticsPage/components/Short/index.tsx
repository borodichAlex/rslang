import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import mockShortStatics from './mockShortStatisticsData';

import styles from '../../styles.module.css';
import CardGame from './components/CardGame';

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
      <Typography variant="h3" component="h2" color="initial" className={styles.heading}>Статистика за сегодня</Typography>
      <div className={styles.list}>
        {
          mockShortStatics.games.map(({
              name,
              amountWords,
              percentageCorrectAnswers,
              seriesCorrectAnswers,
            }) => (
          <CardGame
            key={name}
            {...{
              name,
              amountWords,
              percentageCorrectAnswers,
              seriesCorrectAnswers,
              }
            }
          />
          ))
        }
      </div>
      <Typography variant="h4" component="h3" color="initial">Всего изученно слов: {mockShortStatics.amountWordsDay}</Typography>
      <Typography variant="h4" component="h3" color="initial">Процент правильных ответов за день: {mockShortStatics.percentageCorrectAnswersDay}%</Typography>
    </div>
  );
};

export default ShortStatistics;
