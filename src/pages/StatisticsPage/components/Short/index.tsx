import React, {
 FC, useEffect, useReducer, useState,
} from 'react';
import Typography from '@material-ui/core/Typography';
import mockShortStatics from './mockShortStatisticsData';

import styles from '../../styles.module.css';
import CardGame from './components/CardGame';
import { getUserId } from '../../../../utils/UserUtils';
import { getStatisticsUser } from '../../../../utils/requestsStatistics';
import Loader from '../../../../shared/Loader';

type IDataShortStatistics = {

};

type IProps = {
  data: IDataShortStatistics;
};

const gameNames = ['Спринт', 'Аудио вызов', 'Конструктор слов', 'Саванна'];
const mapPathGames: any = {
  Спринт: 'sprint',
  'Аудио вызов': 'audioChallenge',
  'Конструктор слов': 'wordConstructor',
  Саванна: 'savanna',
};

const preparedGamesStatistics = (name: string, statistics: any) => {
  const game = mapPathGames[name];

  const result: any = statistics.filter((el: any) => el.gameName.includes(game));
  if (!result.length) return null;
  return {
    name,
    amountWords: result[0].learnedWords,
    percentageCorrectAnswers: Number.parseInt(result[0].correctAnswers, 10),
    seriesCorrectAnswers: result[0].streak,
  };
};

const defaultStatistics = {
  games: [],
  amountWordsDay: 0,
  percentageCorrectAnswersDay: 0,
};

const ShortStatistics: FC<IProps> = ({ data }: IProps) => {
  const [statistic, setStatistic] = useState<any>({});

  const [isLoadingStatistics, setIsLoadingStatistics] = useState(true);

  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      getStatisticsUser(userId).then((res: any) => {
        if (!res.length) {
          setStatistic(defaultStatistics);
          setIsLoadingStatistics(false);
          return;
        }

        const arrGamesStatistics = gameNames.map((name) => {
          const dataGame = preparedGamesStatistics(name, res) || {
            name,
            amountWords: 0,
            percentageCorrectAnswers: 0,
            seriesCorrectAnswers: 0,
          };

          return dataGame;
        });

        let newAmountWordsDay = 0;
        let newPercentageCorrectAnswersDay = 0;
        let amountGamesPercentage = 0;

        for (const game of arrGamesStatistics) {
          newAmountWordsDay += game.amountWords;
          if (game.amountWords) {
            amountGamesPercentage += 1;
          }
          newPercentageCorrectAnswersDay += game.percentageCorrectAnswers;
        }

        setStatistic({
          games: arrGamesStatistics,
          amountWordsDay: newAmountWordsDay,
          percentageCorrectAnswersDay: newPercentageCorrectAnswersDay / amountGamesPercentage,
        });
        setIsLoadingStatistics(false);
      });
    }
  }, []);

  if (!isLoadingStatistics) {
    return (
      <div className={`${styles.block}`}>
        <Typography variant="h3" component="h2" color="initial" className={styles.heading}>Статистика за сегодня</Typography>
        <div className={styles.list}>
          {
            statistic.games.map((game: any) => (
              <CardGame key={game.name} {...game} />
            ))
          }
        </div>
        <Typography variant="h4" component="h3" color="initial">Всего изученно слов: {statistic?.amountWordsDay}</Typography>
        <Typography variant="h4" component="h3" color="initial">Процент правильных ответов за день: {Number.parseInt(statistic?.percentageCorrectAnswersDay, 10)}%</Typography>
      </div>
    );
  }
  return <Loader />;
};

export default ShortStatistics;
