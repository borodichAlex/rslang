import baseUrl from '../helpers/baseUrl';
import { IWordsStatistics } from '../pages/games/common/GamePage';
import authorizedRequest from './AuthorizedRequest';

export const getStatisticsUser = async (id: string) => await authorizedRequest(`${baseUrl}/users/${id}/statistics`);

export const setStatisticsUser = async (
  id: string,
  answers: IWordsStatistics,
) => {
  const prevStatistics = await getStatisticsUser(id);
  let newStreak = 0;
  const lenCorrect = answers.listCorrect.length;

  if (prevStatistics.length) {
    const prevStreak = prevStatistics[0].streak;
    newStreak = (prevStreak > lenCorrect) ? prevStreak : lenCorrect;
  } else {
    newStreak = lenCorrect;
  }

  const today = new Date();
  const date = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`;

  await authorizedRequest(`${baseUrl}/users/${id}/statistics`, JSON.stringify({
      learnedWords: lenCorrect,
      date,
      streak: newStreak,
      correctAnswers: lenCorrect / (lenCorrect + answers.listWrong.length) * 100,
      gameName: location.pathname,
    }),
     'POST');
};
