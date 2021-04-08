import React, { useEffect, useRef, useState } from 'react';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
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
  // const [isGame, setIsGame] = useState(false);
  // const [correctAnswers, setCorrectAnswers] = useState([] as string[]);
  const correctAnswer = useRef([] as string[]);
  const wrongAnswer = useRef([] as string[]);

  const stats = {
    correctAnswers: correctAnswer.current,
    wrongAnswers: wrongAnswer.current,
  };

  // const backToMenu = () => {
  //   setIsGame(false);
  // };

  const handleCorrectAnswer = (id: string) => {
    correctAnswer.current = [...correctAnswer.current, id];
  };

  const handleWrongAnswer = (id: string) => {
    wrongAnswer.current = [...wrongAnswer.current, id];
    //! onSetAnswers({
    //   listCorrect: correctAnswer.current,
    //   listWrong: wrongAnswer.current,
    // });
  };

  // const words = words.map((item: IWord) => {
  //   const w = {
  //     word: item.word,
  //     wordTranslate: item.wordTranslate,
  //     id: item.id,
  //   };
  //   return w;
  // });

  // const startGame = () => {
  //   setIsGame(true);
  // };

  return (
    <>
      <ToggleFullScreen />
      <IconButton
        // className={s.exit}
        aria-label="exit"
        onClick={() => onSetPage('MENU_PAGE')}
      >
        <HighlightOffIcon fontSize="large" />
      </IconButton>
      <div className="game">
        <div className="container">
          <Game
            words={words}
            // backToMenu={backToMenu}
            handleCorrectAnswer={handleCorrectAnswer}
            handleWrongAnswer={handleWrongAnswer}
          />
        </div>
      </div>
    </>
  );
};

export default WordConstructor;
