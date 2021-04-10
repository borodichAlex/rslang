import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Context from './context';
import Game from './WordConstructor';
import { IWord } from './interfaces';
import ToggleFullScreen from '../common/ToggleFullScreen';
import s from './WordConstructor.module.scss';
import { IAnswersGame } from '../common/GamePage';

interface IProps {
  words: IWord[];
  onSetPage: (page: string) => void;
  onSetAnswers: (answers: IAnswersGame) => void;
}

const WordConstructor = ({ words, onSetPage, onSetAnswers }: IProps) => {
  const correctAnswer = useRef([] as string[]);
  const wrongAnswer = useRef([] as string[]);
  const [isGameOver, setIsGameOver] = useState(false as boolean);

  const gameOver = () => {
    setIsGameOver(!isGameOver);
  };

  useEffect(() => {
    isGameOver
      ? onSetAnswers({
          listCorrect: correctAnswer.current,
          listWrong: wrongAnswer.current,
        })
      : null;
  }, [isGameOver]);

  const handleCorrectAnswer = (id: string) => {
    correctAnswer.current = [...correctAnswer.current, id];
  };

  const handleWrongAnswer = (id: string) => {
    wrongAnswer.current = [...wrongAnswer.current, id];
  };
  const shuffleWords = JSON.parse(JSON.stringify(words));
  shuffleWords.sort(() => Math.random() - 0.5);
  return (
    <Context.Provider value={[isGameOver, setIsGameOver]}>
      <div className={s.container}>
        <ToggleFullScreen />
        <div className={s.exit}>
          <IconButton aria-label="exit" onClick={() => onSetPage('MENU_PAGE')}>
            <HighlightOffIcon fontSize="large" />
          </IconButton>
        </div>

        <div className={s.game}>
          <Game
            words={shuffleWords}
            gameOver={gameOver}
            handleCorrectAnswer={handleCorrectAnswer}
            handleWrongAnswer={handleWrongAnswer}
          />
        </div>
      </div>
    </Context.Provider>
  );
};

export default WordConstructor;
