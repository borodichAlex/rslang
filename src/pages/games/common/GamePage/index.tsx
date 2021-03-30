import React, { useState } from 'react';
import PreviewGame from '../PreviewGame/PreviewGame';
import getWords from '../../../../helpers/getWords';

import { IWord } from '../../../../interfaces/IWord';
import { IFnSetComplexity } from '../../interfaces/IFnSetComplexity';
import { IDataGame } from '../../interfaces/IDataGame';

const initialPage = 'MENU_PAGE';

type IProps = {
  Game: React.ComponentType<any>;
  dataGame: IDataGame;
}

function GamePage({ Game, dataGame }: IProps) {
  const [page, setPage] = useState(initialPage);

  const [words, setWords] = useState<IWord[]>([]);
  const [complexity, setComplexity] = useState(1);

  const handleSetPage = (namePage: string) => {
    setPage(namePage);
  };

  const handleSetComplexity: IFnSetComplexity = (lvl: number) => {
    setComplexity(lvl);
  };

  const handleStartGame = () => {
    getWords(complexity).then((res) => {
      if (res) {
        setWords(res);
        setPage('GAME_PAGE');
      }
    });
  };

  return (
    <div style={{backgroundColor: dataGame.bg}}>
      {(page === 'MENU_PAGE') && <PreviewGame dataGame={dataGame} onStart={handleStartGame} onSetComplexity={handleSetComplexity} />}
      {(page === 'GAME_PAGE') && <Game words={words} onSetPage={handleSetPage} />}
    </div>
  );
}

export default GamePage;
