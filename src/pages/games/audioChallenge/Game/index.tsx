import React from 'react';
import { IWord } from '../../../../interfaces/IWord';

type IProps = {
  words: IWord[];
  onSetPage: (page: string) => void;
}

const Game = ({ words, onSetPage }: IProps) => {
  console.log({words});

  return (
    <div>
      <h2>Game</h2>
      <button type="button" onClick={() => onSetPage('MENU_PAGE')}>back to menu</button>
    </div>
  );
};

export default Game;
