import type { IProps as IGameProps } from './components/CardGame';

const mockSprint: IGameProps = {
  name: 'Спринт',
  amountWords: 10,
  percentageCorrectAnswers: 90,
  seriesCorrectAnswers: 9,
};

const mockAudioChallenge: IGameProps = {
  name: 'Аудио вызов',
  amountWords: 10,
  percentageCorrectAnswers: 90,
  seriesCorrectAnswers: 9,
};

const mockWordConstructor: IGameProps = {
  name: 'Конструктор слов',
  amountWords: 10,
  percentageCorrectAnswers: 90,
  seriesCorrectAnswers: 9,
};

const mockSavanna: IGameProps = {
  name: 'Саванна',
  amountWords: 10,
  percentageCorrectAnswers: 90,
  seriesCorrectAnswers: 9,
};

export type IShortStatistics = {
  games: IGameProps[],
  amountWordsDay: number,
  percentageCorrectAnswersDay: number,
}

const mockShortStatistics: IShortStatistics = {
  games: [mockSprint, mockAudioChallenge, mockWordConstructor, mockSavanna],
  amountWordsDay: 50,
  percentageCorrectAnswersDay: 70,
};

export default mockShortStatistics;
