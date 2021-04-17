import React, { FC } from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';

import styles from './styles.module.css';

export type IProps = {
  name: string,
  amountWords: number,
  percentageCorrectAnswers: number,
  seriesCorrectAnswers: number;
};

const CardGame: FC<IProps> = ({
 name, amountWords, percentageCorrectAnswers, seriesCorrectAnswers,
}: IProps) => (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h4" component="h3" className={styles.title} color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="h4">
          Слов изученно: {amountWords}
        </Typography>
        <Typography variant="h5" component="h4">
          Правильных ответов: {percentageCorrectAnswers}%
        </Typography>
        <Typography variant="h5" component="h4">
          Самая длиная серия: {seriesCorrectAnswers}
        </Typography>
      </CardContent>
    </Card>
  );

export default CardGame;
