import React, { useState, useEffect } from 'react';
import { LinearProgress, IconButton, Button } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/core/styles';
import { IWord } from '../../../interfaces/IWord';
import RightWord from './components/RightWord';
import Words from './components/Words';
import ToggleFullScreen from '../common/ToggleFullScreen';
import { IAnswersGame, urlBaseDataWords } from '../common/GamePage';

type IProps = {
  words: IWord[];
  onSetPage: (page: string) => void;
  onSetAnswers: (answers: IAnswersGame) => void;
}

export type IWordStage = {
  id: string;
  word: string;
  wordTranslate: string;
  audio: string;
  image: string;
}

const amountStagesGame = 10;
const baseAmountWordsStage = 5;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    minHeight: '100vh',
    position: 'relative',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',

    marginTop: '1.5rem',
    marginBottom: '1rem',
  },

  progress: {
    position: 'absolute',
    top: 0,

    height: '10px',
    width: '100%',
  },

  exit: {
    position: 'absolute',
    top: '1em',
    right: '1em',
  },

  fullScreen: {
    position: 'absolute',
    top: '1em',
    left: '1em',
  },
});

const getPreparedWordsStage = (words: IWord[], stage: number, amountWordsStage: number) => {
  const wordsStage: IWordStage[] = [];
  const startIndexWords = (stage === 1) ? 0 : amountWordsStage * (stage - 1);

  for (let i = startIndexWords; i < amountWordsStage * stage; i += 1) {
    const {
      id, word, wordTranslate, audio, image,
    } = words[i];
    wordsStage.push({
      id, word, wordTranslate, audio, image,
    });
  }

  return wordsStage;
};

const getRightWord = (words: IWordStage[]) => {
  const randomIndex = Math.floor(Math.random() * 4);
  return words[randomIndex];
};

const AudioChallenge = ({ words, onSetPage, onSetAnswers }: IProps) => {
  const [stage, setStage] = useState(1);
  const [wordsStage, setWordsStage] = useState<IWordStage[]>(
    getPreparedWordsStage(words, stage, baseAmountWordsStage),
  );
  const [rightWord, setRightWord] = useState<IWordStage>(getRightWord(wordsStage));
  const [isSelectedAnswer, setIsSelectedAnswer] = useState(false);
  const [isRightAnswer, setIsRightAnswer] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (stage > 1 && stage <= amountStagesGame) {
      const preparedWordsStage = getPreparedWordsStage(words, stage, baseAmountWordsStage);
      const preparedRightWord = getRightWord(preparedWordsStage);
      setWordsStage(preparedWordsStage);
      setRightWord(preparedRightWord);
      setIsSelectedAnswer(false);
    } else if (stage > amountStagesGame) {
      onSetAnswers({
        listCorrect: correctAnswers,
        listWrong: wrongAnswers,
      });
    }
  }, [stage]);

  const audioNode = new Audio(urlBaseDataWords + rightWord?.audio);
  const handlePlayAudio = () => {
    if (!audioNode.ended) {
      audioNode.currentTime = 0;
    }
    audioNode.play();
  };

  useEffect(() => {
    handlePlayAudio();
    return () => {
      audioNode.pause();
    };
  }, [rightWord]);

  const handleExit = () => {
    onSetPage('MENU_PAGE');
  };

  const handleSelectAnswer = (isRight: boolean) => {
    setIsSelectedAnswer(true);
    setIsRightAnswer(isRight);
  };

  const handleNextStage = () => {
    if (!isSelectedAnswer) {
      setIsSelectedAnswer(true);
      setIsRightAnswer(false);
    } else if (stage <= amountStagesGame && rightWord) {
      if (isSelectedAnswer && isRightAnswer) {
        setCorrectAnswers((answers) => [...answers, rightWord.id]);
      } else {
        setWrongAnswers((answers) => [...answers, rightWord.id]);
      }
      setStage((prevStage) => prevStage + 1);
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    const { code }: {code: string} = e;

    if (code === 'Escape') handleExit();
    if (code === 'Enter') handleNextStage();
    if (code === 'KeyR') handlePlayAudio();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  });

  const classes = useStyles();

  if (rightWord !== undefined) {
    return (
      <div className={classes.root}>
        <LinearProgress className={classes.progress} variant="determinate" value={(stage - 1) * 10} />
        <div className={classes.content}>
          <RightWord
            word={rightWord.word}
            imageUrl={rightWord.image}
            isSelectedAnswer={isSelectedAnswer}
            onPlayAudio={handlePlayAudio}
          />
          <Words
            words={wordsStage}
            idRightWord={rightWord.id}
            onSelectAnswer={handleSelectAnswer}
            isSelectedAnswer={isSelectedAnswer}
          />
          <Button
            variant="outlined"
            size="large"
            onClick={handleNextStage}
            style={{ width: '10rem', height: '3rem' }}
          >
            {(isSelectedAnswer) ? <ArrowRightAltIcon fontSize="large" /> : 'Не знаю'}
          </Button>
        </div>
        <IconButton
          className={classes.exit}
          aria-label="exit"
          onClick={handleExit}
        >
          <HighlightOffIcon fontSize="large" />
        </IconButton>
        <div className={classes.fullScreen}>
          <ToggleFullScreen />
        </div>
      </div>
    );
  }

  return <span>Loading...</span>;
};

export default AudioChallenge;
