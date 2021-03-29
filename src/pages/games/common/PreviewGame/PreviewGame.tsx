import React from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  useLocation,
} from 'react-router-dom';
import ListDifficultyLevel from './ListDifficultyLevel/ListDifficultyLevel';
import styles from './styles.module.css';

type IProps = {
  dataGame: {
    name: string;
    goal: string;
    description: string;
    bg: string;
  }
  onStart: () => void;
  onSetComplexity: (lvl: number) => void;
}

const useStyles = makeStyles({
  root: ({ bg }: { bg: string }) => ({
    display: 'grid',
    placeContent: 'center',
    backgroundColor: bg,
    minHeight: '100vh',
  }),

  content: ({ bg, isShowDifficulty }: { bg: string, isShowDifficulty: boolean }) => ({
    gridColumn: isShowDifficulty ? '1 / 2' : '1 / 3',
  }),

  wrapBtn: ({ bg, isShowDifficulty }: { bg: string, isShowDifficulty: boolean }) => ({
    gridColumn: isShowDifficulty ? '1' : '1 / 3',
  }),

  glass: {
    background: 'linear-gradient(to right bottom,rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
    backdropFilter: 'blur(2rem)',
  },

  name: {
    marginBottom: '1rem',
  },

  description: {
    marginTop: '.5rem',
    maxWidth: '650px',
    textAlign: 'justify',
  },

  sidebar: ({ bg }: {bg: string}) => ({
    boxSizing: 'border-box',
    boxShadow: '6px 6px 20px rgba(122, 122, 122, 0.212)',
    padding: '1rem',
    borderRadius: '1rem',
    backgroundColor: bg,
    background: 'linear-gradient(to left top,rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))',
  }),
});

const PreviewGame = (props: IProps) => {
  const {
    dataGame: {
      name, goal, description, bg,
    },
    onStart,
    onSetComplexity,
  } = props;

  const location: {state: {prevPath: string}} = useLocation();
  const isShowDifficulty = location.state === undefined || location.state.prevPath === '/menu';

  const stylesProps = { bg, isShowDifficulty };
  const classes = useStyles(stylesProps);

  return (
    <section className={classes.root}>
      <div className={`${classes.glass} ${styles.container}`}>
        <Grid item className={`${styles.content} ${classes.content}`}>
          <Typography variant="h2" className={classes.name}>{name}</Typography>
          <Typography variant="subtitle1">{goal}</Typography>
          <Typography className={classes.description} variant="body1">{description}</Typography>
        </Grid>
        <Grid item className={`${styles.wrapBtn} ${classes.wrapBtn}`}>
          <Button variant="contained" color="primary" size="large" onClick={onStart}>Start game</Button>
        </Grid>
        {
          isShowDifficulty && (
          <Grid item className={`${classes.sidebar} ${styles.sidebar}`}>
            <Typography variant="h4">Сложность</Typography>
            <ListDifficultyLevel onSetComplexity={onSetComplexity} />
          </Grid>
          )
        }
      </div>
    </section>
  );
};

export default PreviewGame;
