import React from 'react';
import {
  Typography, List, ListItem, ListItemIcon, ListItemText, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { IWordsStatistics, urlBaseDataWords } from '../GamePage';
import { IWord } from '../../../../interfaces/IWord';

type IProps = {
  answers: IWordsStatistics;
  onSetPage: (page: string) => void;
}

type IFnPlayAudio = (url: string) => void;

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    background: 'linear-gradient(to right bottom,rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
    backdropFilter: 'blur(2rem)',

    borderRadius: '1rem',
    padding: '5px',
    margin: '1rem',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  wrapAnswers: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  wrapList: {
    backgroundColor: 'rgba(255, 255, 255, 0.555)',
    padding: '10px',
    borderRadius: '1rem',
    margin: '5px',

    flexBasis: '43%',

    '& h3': {
      textAlign: 'center',
    },
  },

  list: {
    marginTop: '.5rem',
    minWidth: '220px',
    maxHeight: '50vh',
    overflowY: 'auto',
  },

  heading: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },

  amount: {
    display: 'inline-block',
    padding: '5px 20px',
    borderRadius: '1rem',
    marginLeft: '10px',
    color: 'white',
    fontSize: '1.5rem',
  },

  correct: {
    backgroundColor: 'green',
  },

  wrong: {
    backgroundColor: 'brown',
  },

  icon: {
    minWidth: '32px',
  },

  back: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});

const Word = ({ word, onPlayAudio }: {word: IWord, onPlayAudio: IFnPlayAudio}) => {
  const text = `${(word.word)[0].toUpperCase() + word.word.slice(1)} — ${word.wordTranslate}`;
  const classes = useStyles();
  return (
    <ListItem button onClick={() => onPlayAudio(word.audio)}>
      <ListItemIcon className={classes.icon}>
        <VolumeUpIcon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

type IListWordsProps = {
  words: IWord[];
  title: string;
  isCorrect: boolean;
  onPlayAudio: IFnPlayAudio;
}

const ListWords = ({
  words, title, onPlayAudio, isCorrect,
}: IListWordsProps) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapList}>
      <Typography variant="h5" component="h3" color="initial">
        {title}
        <span className={`${isCorrect ? classes.correct : classes.wrong} ${classes.amount}`}>{words.length}</span>
      </Typography>
      <List className={classes.list} component="ul" aria-label="list words">
        {
          words.map((word) => <Word key={word.id} word={word} onPlayAudio={onPlayAudio} />)
        }
      </List>
    </div>
  );
};

const StatisticsGame = ({ answers, onSetPage }: IProps) => {
  const audioNode = new Audio();

  const handlePlayAudio: IFnPlayAudio = (audioUrl) => {
    const url = urlBaseDataWords + audioUrl;
    const isNewUrl = url !== audioNode.currentSrc;
    const isPlaying = !audioNode.ended;

    if (isNewUrl) {
      if (isPlaying) {
        audioNode.pause();
      }
      audioNode.src = url;
    } else if (isPlaying) {
      audioNode.currentTime = 0;
    }

    audioNode.play();
  };

  const classes = useStyles();

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.heading} variant="h4" component="h2" color="initial">Результаты</Typography>
        <div className={classes.wrapAnswers}>
          <ListWords words={answers.listCorrect} isCorrect title="Правильно" onPlayAudio={handlePlayAudio} />
          <ListWords words={answers.listWrong} isCorrect={false} title="Ошибки" onPlayAudio={handlePlayAudio} />
        </div>
        <Button className={classes.back} variant="outlined" size="large" onClick={() => onSetPage('MENU_PAGE')}>Вернуться в меню</Button>
      </div>
    </section>
  );
};

export default StatisticsGame;
