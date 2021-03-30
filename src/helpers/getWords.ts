import { IWord } from '../interfaces/IWord';

const getWords = async (complexity: number) => {
  const url = `https://react-learnwords-example.herokuapp.com/words?group=${complexity}&page=1`;
  const response = await fetch(url);
  const parsedResponse: IWord[] = await response.json();
  return parsedResponse;
};

export default getWords;
