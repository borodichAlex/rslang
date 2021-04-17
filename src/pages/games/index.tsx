import React, { FC } from 'react';
import {
  Route,
} from 'react-router-dom';
import GamePage from './common/GamePage';
import AudioChallenge from './audioChallenge';
import Sprint from './Sprint/Sprint';
import WordConstructor from './wordConstructor';
import Savanna from './Savanna/Savanna';
import {
  savannaData,
  sprintData,
  wordConstructorData,
  audioChallengeData,
} from './helpers/gamesData';

const Games: FC = () => (
  <>
    <Route exact path="/games/audioChallenge">
      <GamePage Game={AudioChallenge} dataGame={audioChallengeData} />
    </Route>
    <Route path="/games/sprint">
      <GamePage dataGame={sprintData} Game={Sprint} />
    </Route>
    <Route path="/games/wordConstructor">
      <GamePage dataGame={wordConstructorData} Game={WordConstructor} />
    </Route>
    <Route path="/games/savanna">
      <GamePage dataGame={savannaData} Game={Savanna} />
    </Route>
  </>
);

export default Games;
