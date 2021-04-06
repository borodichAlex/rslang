import React from 'react';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

type IProps = {
  id: string;
  translate: string;
  numKey: number;
  isRightWord: boolean;
  isSelectedWord: boolean;
  isSelectedAnswer: boolean;
  onSelectWord: (id: string) => void;
}

const Word = ({
  id, translate, numKey, isRightWord, onSelectWord, isSelectedAnswer, isSelectedWord,
}: IProps) => {
  const handleClick = () => {
    if (!isSelectedAnswer) {
      onSelectWord(id);
    }
  };

  const isRightAnswer = isRightWord && isSelectedWord;

  const styles = {
    borderBottom: (isSelectedWord) ? `2px solid ${isRightWord ? 'green' : 'red'}` : '2px solid transparent',
  };

  return (
    <Button
      variant="text"
      onClick={handleClick}
      disabled={isSelectedAnswer && !isRightWord}
      startIcon={isSelectedAnswer && (isRightAnswer)
        ? <CheckCircleIcon style={{ color: 'green' }} />
        : (
          <span style={{
            borderRadius: '8px', border: '2px solid lightslategray', padding: '0px 3px', fontSize: '1em',
          }}
          >
            {numKey}
          </span>
        )}
      style={styles}
      size="large"
    >
      {translate}
    </Button>
  );
};

export default Word;
