import React, { useEffect, useReducer, useState } from 'react';
// import './WordConstructor.module.scss';
import { Button, Paper, Typography } from '@material-ui/core';
import { IGame, IWord } from './interfaces';
import errorSound from '../../../assets/Error.mp3';
import successSound from '../../../assets/Correct.mp3';

import Timer from './timer';
import s from './WordConstructor.module.scss';

const playSound = (path: string) => {
  const audio = document.createElement('audio');
  audio.style.display = 'none';
  audio.src = path;
  audio.autoplay = true;
  audio.onended = function () {
    audio.remove();
  };
  document.body.appendChild(audio);
};

const createCells = (len: number) => {
  const arr = Array(len).fill('');
  return arr;
};

const createLetters = (currentWord: IWord) => {
  const arr = currentWord.word
    .split('')
    .sort(() => Math.random() - 0.5)
    .map((item) => ({ value: item }));
  return arr;
};

type State = {
  answer: any[];
  cellIndex: number;
  currentLetters: {
    value: string;
  }[];
};

function init(curWord: IWord) {
  console.log(curWord);

  return {
    answer: createCells(curWord.word.length),
    cellIndex: 0,
    currentLetters: createLetters(curWord),
  };
}

function reducer(
  state: State,
  action: {
    type: string;
    payload: { value: string } | IWord;
  },
): State {
  switch (action.type) {
    case 'ADD_LETTER': {
      const item = action.payload as { value: string };
      const { cellIndex, answer, currentLetters } = state;

      const copyAnswer = [...answer];
      copyAnswer[cellIndex] = action.payload;
      const newLetters = currentLetters.filter((el) => el !== item);
      return {
        answer: copyAnswer,
        cellIndex: cellIndex + 1,
        currentLetters: newLetters,
      };
    }
    case 'RESET': {
      const word = action.payload as IWord;
      return init(word);
    }
    default:
      throw new Error();
  }
}

const Game = ({
  words,
  gameOver,
  handleCorrectAnswer,
  handleWrongAnswer,
}: IGame) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord: IWord = words[currentIndex];
  // const [timer, setTimer] = useState(60);
  // const [isGameOver, setIsGameOver] = useState(false);

  const [state, dispatch] = useReducer(reducer, currentWord, init);

  const handleKey = (event: KeyboardEvent) => {
    const key = state.currentLetters.find(
      (item) => item.value === event.code[event.code.length - 1].toLowerCase(),
    );

    if (key) {
      dispatch({ type: 'ADD_LETTER', payload: key });
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (timer >= 1) {
  //       setTimer(timer - 1);
  //     } else {
  //       clearInterval(interval);
  //       setTimeout(() => setIsGameOver(true), 500);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [timer]);

  const checkAnswer = () => {
    const check = state.answer.map((i) => i.value).join('');
    if (check === currentWord.word) {
      playSound(successSound);
      handleCorrectAnswer(currentWord.id);
    } else {
      playSound(errorSound);
      handleWrongAnswer(currentWord.id);
    }
    if (currentIndex < words.length - 1) {
      setTimeout(nextWord, 600);
    }
    // else setIsGameOver(true);
  };

  const nextWord = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    reset();
  }, [currentIndex]);

  useEffect(() => {
    window.addEventListener('keypress', handleKey);

    return () => window.removeEventListener('keypress', handleKey);
  });

  const reset = () => {
    dispatch({ type: 'RESET', payload: currentWord });
  };

  return (
    <>
      <div className="translate">
        <Typography>{currentWord.wordTranslate}</Typography>
      </div>

      <div>
        {state.answer.map((item, index) => {
          const key = index;
          const cell = (
            <Paper
              elevation={4}
              color="primary"
              key={key * Math.random()}
              className={s.cell}
            >
              {item.value}
            </Paper>
          );
          return cell;
        })}
      </div>

      <div>
        {state.currentLetters.map((item, index) => {
          const key = index;
          const letter = (
            <Button
              className={s.letter}
              color="primary"
              variant="contained"
              onClick={() => dispatch({ type: 'ADD_LETTER', payload: item })}
              key={key * Math.random()}
            >
              {item.value}
            </Button>
          );
          return letter;
        })}
      </div>

      <Button color="primary" variant="contained" onClick={reset}>
        Сбросить
      </Button>
      {/* <span>{timer}</span> */}
      <Timer />
      <Button color="secondary" variant="contained" onClick={checkAnswer}>
        Проверить
      </Button>
    </>
  );
};

export default Game;
