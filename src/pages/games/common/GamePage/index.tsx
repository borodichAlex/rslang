import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getNumbersWords } from '../../../../helpers/getWords';
import PreviewGame from '../PreviewGame/PreviewGame';
import { IWord } from '../../../../interfaces/IWord';
import { IFnSetComplexity } from '../../interfaces/IFnSetComplexity';
import { IDataGame } from '../../interfaces/IDataGame';
import StatisticsGame from '../StatisticsGame';

export const urlBaseDataWords = 'https://raw.githubusercontent.com/borodichalex/react-rslang-be/master/';

const initialPage = 'MENU_PAGE';

type IProps = {
  Game: React.ComponentType<any>;
  dataGame: IDataGame;
}

export type IWordsStatistics = {
  listWrong: IWord[];
  listCorrect: IWord[];
}

export type IAnswersGame = {
  listWrong: string[];
  listCorrect: string[];
}

function GamePage({ Game, dataGame }: IProps) {
  const [page, setPage] = useState(initialPage);

  const [words, setWords] = useState<IWord[]>([]);
  const [complexity, setComplexity] = useState(1);
  const [answers, setAnswers] = useState<IWordsStatistics>({ listWrong: [], listCorrect: [] });

  const handleSetAnswers = (answersGame: IAnswersGame) => {
    const findWordIndex = (idWord: string) => words.findIndex(({ id }) => id === idWord);
    const findWord = (idWord: string) => {
      const indexWord: number = findWordIndex(idWord);
      return words[indexWord];
    };
    const listWrongWords: IWord[] = answersGame.listWrong.map(findWord);
    const listCorrectWords: IWord[] = answersGame.listCorrect.map(findWord);
    setAnswers({ listWrong: listWrongWords, listCorrect: listCorrectWords });
    handleSetPage('STATISTICS_PAGE');
  };

  const handleSetPage = (namePage: string) => {
    setPage(namePage);
  };

  const location: {state: {prevPath: string}} = useLocation();
  const isShowComplexity = location.state === undefined || location.state.prevPath === '/menu';

  const handleSetComplexity: IFnSetComplexity = (lvl: number) => {
    setComplexity(lvl);
  };

  const handleStartGame = () => {
    getNumbersWords(dataGame.amountWords, complexity)
      .then((res) => {
        if (res.length >= dataGame.amountWords) {
          setWords(res);
          setPage('GAME_PAGE');
        }
      });
  };

  const styles = {
    backgroundColor: dataGame.bg,
  };

  return (
    <div style={styles}>
      {(page === 'MENU_PAGE') && (
      <PreviewGame
        dataGame={dataGame}
        onStart={handleStartGame}
        isShowComplexity={isShowComplexity}
        onSetComplexity={handleSetComplexity}
      />
      )}
      {(page === 'GAME_PAGE') && <Game words={words} onSetPage={handleSetPage} onSetAnswers={handleSetAnswers} />}
      {(page === 'STATISTICS_PAGE') && <StatisticsGame onSetPage={handleSetPage} answers={answers} />}
    </div>
  );
}

export default GamePage;
