import React, { useState, useEffect, FC } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Word from '../Word';
import { IWordStage } from '../..';
import styles from './styles.module.css';

type IProps = {
  words: IWordStage[];
  idRightWord: string;
  isSelectedAnswer: boolean;
  onSelectAnswer: (isRight: boolean) => void;
};

const Words: FC<IProps> = ({
  words, idRightWord, isSelectedAnswer, onSelectAnswer,
}: IProps) => {
  const [idSelectedWord, setIdSelectedWord] = useState('');
  const handleSelectWord = (idWord: string) => {
    onSelectAnswer(idRightWord === idWord);
    setIdSelectedWord(idWord);
  };

  const handleKeyWord = ({ code }: {code: string}) => {
    if (!isSelectedAnswer) {
      const numWord = Number(code[code.length - 1]);
      if (numWord > 0 && numWord <= 5) {
        const idWord = words[numWord - 1].id;
        handleSelectWord(idWord);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyWord);
    return () => {
      window.removeEventListener('keypress', handleKeyWord);
    };
  });

  return (
    <ButtonGroup className={styles.words} variant="text" color="default" aria-label="List words">
      {
        words.map((word, index) => (
          <Word
            key={word.id}
            id={word.id}
            translate={word.wordTranslate}
            isRightWord={word.id === idRightWord}
            numKey={index + 1}
            isSelectedAnswer={isSelectedAnswer}
            isSelectedWord={word.id === idSelectedWord}
            onSelectWord={handleSelectWord}
          />
        ))
      }
    </ButtonGroup>
  );
};

export default Words;
