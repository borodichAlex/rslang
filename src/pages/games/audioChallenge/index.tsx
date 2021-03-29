import React, { useState } from 'react';
import PreviewGame from '../common/PreviewGame/PreviewGame';
import getWords from '../../../helpers/getWords';
import Game from './Game';

import { IWord } from '../../../interfaces/IWord';

const dataGame = {
  name: 'Аудиовызов',
  goal: 'Цель - выбрать перевод слова по звучащему произношению.',
  description: `В процессе игры звучит произношение слова на английском языке, нужно выбрать перевод слова из пяти предложенных вариантов ответа.
          Слова можно угадывать, выбирая их как кликами мышкой, так и нажатием кнопок клавиатуры от 1 до 5.
          Переход к следующему вопросу происходит как при клике по стрелке, так и нажатием клавиши Enter.`,
  bg: '#f3831a',
};

function AudioChallenge() {
  const [page, setPage] = useState('MENU_PAGE');

  const [words, setWords] = useState<IWord[]>([]);
  const [complexity, setComplexity] = useState(1);

  const handleSetPage = (namePage: string) => {
    setPage(namePage);
  };

  const handleSetComplexity = (lvl: number) => {
    setComplexity(lvl);
    console.log({lvl});
  };

  const handleStartGame = () => {
    console.log('start game');

    getWords(complexity).then((res) => {
      if (res) {
        console.log(res);
        setWords(res);
        setPage('GAME_PAGE');
      }
    });
  };

  return (
    <div>
      {(page === 'GAME_PAGE') && <Game words={words} onSetPage={handleSetPage} />}
      {(page === 'MENU_PAGE') && <PreviewGame dataGame={dataGame} onStart={handleStartGame} onSetComplexity={handleSetComplexity} />}
      {/* {(page === 'STATISTIC_PAGE') && <Statistics onSetPage={handleSetPage} />} */}
    </div>
  );
}

export default AudioChallenge;
