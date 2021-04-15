import { IWord } from '../interfaces/IWord';
import baseUrl from './baseUrl';

const getWords = async (complexity: number, page: number) => {
  const url = `${baseUrl}/words?group=${complexity}&page=${page}`;
  const response = await fetch(url);
  const parsedResponse: IWord[] = await response.json();
  return parsedResponse;
};

export const getNumbersWords = async (amount: number, complexity: number):Promise<IWord[]> => {
  const baseAmountWords = 20;
  const prepareArr = [];
  for (let i = 0; i < Math.ceil(amount / baseAmountWords); i += 1) {
    const page = i;
    prepareArr.push(getWords(complexity, page));
  }

  const arrWords: IWord[] = [];
  await Promise.all(prepareArr).then((values) => {
    arrWords.push(...values.flat());
  });

  return arrWords;
};

export default getWords;
