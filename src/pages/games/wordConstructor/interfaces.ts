interface IGame {
  words: IWord[];
  gameOver: () => void;
  handleCorrectAnswer: (id: string) => void;
  handleWrongAnswer: (id: string) => void;
}

interface IWord {
  audio?: string;
  audioExample?: string;
  audioMeaning?: string;
  group?: string;
  id: string;
  image?: string;
  page?: string;
  textExample?: string;
  textExampleTranslate?: string;
  textMeaning?: string;
  textMeaningTranslate?: string;
  transcription?: string;
  word: string;
  wordTranslate: string;
}

// interface IWords {
//   data: IWord[];
// }

export type { IGame, IWord };
