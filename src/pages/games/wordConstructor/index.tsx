import React, { useEffect, useRef, useState } from 'react';
import Game from './WordConstructor';
import { IWords, IWord } from './interfaces';
import ToggleFullScreen from '../common/ToggleFullScreen';
import s from './WordConstructor.module.scss';

const WordConstructor = ({ data }: IWords) => {
  const [isGame, setIsGame] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([] as string[]);
  const correctAnswer = useRef([] as string[]);
  const wrongAnswer = useRef([] as string[]);

  const stats = {
    correctAnswers: correctAnswer.current,
    wrongAnswers: wrongAnswer.current,
  };

  const backToMenu = () => {
    setIsGame(false);
  };

  const handleCorrectAnswer = (id: string) => {
    correctAnswer.current = [...correctAnswer.current, id];
  };

  const handleWrongAnswer = (id: string) => {
    wrongAnswer.current = [...wrongAnswer.current, id];
  };

  const words = data.map((item: IWord) => {
    const w = {
      word: item.word,
      wordTranslate: item.wordTranslate,
      id: item.id,
    };
    return w;
  });

  const startGame = () => {
    setIsGame(true);
  };

  return (
    <>
      <ToggleFullScreen />
      <div className="game">
        <div className="container">
          {isGame ? (
            <Game
              words={words}
              backToMenu={backToMenu}
              handleCorrectAnswer={handleCorrectAnswer}
              handleWrongAnswer={handleWrongAnswer}
            />
          ) : (
            <button type="button" onClick={startGame}>
              Start Game
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default WordConstructor;
