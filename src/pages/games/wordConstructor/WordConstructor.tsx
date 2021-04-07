import React, { useEffect, useReducer, useState } from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

  const [state, dispatch] = useReducer(reducer, currentWord, init);

  const handleKey = (event: KeyboardEvent) => {
    const key = state.currentLetters.find(
      (item) => item.value === event.code[event.code.length - 1].toLowerCase(),
    );

    if (key) {
      dispatch({ type: 'ADD_LETTER', payload: key });
    }
  };

  const useStyles = makeStyles((theme: Theme) => {
    const style = createStyles({
      cells: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      translate: {
        fontSize: '2rem',
      },
    });
    return style;
  });

  const classes = useStyles();

  useEffect(() => {
    window.addEventListener('keypress', handleKey);

    return () => window.removeEventListener('keypress', handleKey);
  });

  const reset = () => {
    dispatch({ type: 'RESET', payload: currentWord });
  };

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
  };

  const nextWord = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    reset();
  }, [currentIndex]);

  return (
    <>
      <div className={s.root}>
        <Grid container justify="center" spacing={3}>
          <Grid item xs="auto">
            <Typography className={classes.translate}>
              {currentWord.wordTranslate}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {state.answer.map((item, index) => {
            const key = index;
            const cell = (
              <Grid item xs="auto">
                <Paper
                  elevation={4}
                  color="primary"
                  key={key * Math.random()}
                  className={classes.cells}
                >
                  {item.value}
                </Paper>
              </Grid>
            );
            return cell;
          })}
        </Grid>

        <Grid container spacing={2} className={s.letters}>
          {state.currentLetters.map((item, index) => {
            const key = index;
            const letter = (
              <Grid item xs="auto">
                <Button
                  size="small"
                  className={s.letter}
                  color="primary"
                  variant="contained"
                  onClick={() => dispatch({ type: 'ADD_LETTER', payload: item })}
                  key={key * Math.random()}
                >
                  {item.value}
                </Button>
              </Grid>
            );
            return letter;
          })}
        </Grid>

        <Grid container justify="center" spacing={3}>
          <Grid item xs="auto">
            <Button
              color="primary"
              variant="contained"
              onClick={reset}
              // className={s.reset}
            >
              Сбросить
            </Button>
          </Grid>

          <Grid item xs="auto">
            <Button color="secondary" variant="contained" onClick={checkAnswer}>
              Проверить
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className={s.timer}>
        <Timer />
      </div>
    </>
  );
};

export default Game;
