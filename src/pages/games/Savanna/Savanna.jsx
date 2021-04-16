import React, {useEffect, useState, useCallback} from 'react';
import getWords from '../../../helpers/getWords';
import './Savanna.scss';
import { withStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Error from '../../../assets/Error.mp3';
import Correct from '../../../assets/Correct.mp3';

const correctAnswers = [];
const wrongAnswers = [];
const excludeWords = [];
const WINDOW_HEIGHT = window.innerHeight;
const audioCorrect = new Audio(Correct);
const audioWrong = new Audio(Error);
let eventWorked = false;

const StyledRating = withStyles({
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);


const Savanna = ({words, onSetAnswers}) => {
    const [backgroundPosY, setbBackgroundPosY] = useState(98);
    const [questionPosY, setQuestionPosY] = useState(10);
    const [currentWords, setCurrentWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(null);
    const [lives, setLives] = useState(5);
    let timeout = null;
    let questionTimeout = null;

    useEffect(() => {
        getNextWords();
    }, [])
    useEffect(() => {
        if(lives === 0) {
            gameOver();
        }
    }, [lives])

    useEffect(() => {
        if(currentWord) {
            eventWorked = false;
            timeout = setTimeout(() => checkAnswer(null, true), 5000);
            document.addEventListener("keydown", handlerAnswer);
            setTimeout(() => setQuestionPosY(550), 20);

            return () => {
                clearTimeout(timeout);
                clearTimeout(questionTimeout);
            };
        }
    }, [currentWord])

    const getNextWords = () => {
        const rndWords = getRandomWords();
        const first = rndWords[0];
        setCurrentWords(rndWords.sort(() => Math.floor(Math.random() * 3 + -1)));
        setCurrentWord(first);
    }

    const allowedKeys = ["1", "2", "3", "4"]

    const handlerAnswer = (e) => {
        document.removeEventListener("keydown", handlerAnswer);
        if(eventWorked) return;
        if(e instanceof KeyboardEvent && allowedKeys.includes(e.key)) checkAnswer(e.key);
        else if(!(e instanceof KeyboardEvent)) checkAnswer(e.target.textContent.substr(0, 1));
    }

    const checkAnswer = (answer, timeout = false) => {
        eventWorked = true;
        excludeWords.push(currentWord);
        if(timeout) {
            wrongAnswers.push(currentWord.id);
            setLives(lives => lives - 1);
            audioWrong.play();
            setQuestionPosY(WINDOW_HEIGHT);
        }
        else {
            clearTimeout(timeout);
            setQuestionPosY(WINDOW_HEIGHT);
            const answerWord = currentWords[+answer - 1]?.word;
            if(answerWord === currentWord.word) {
                correctAnswers.push(currentWord.id)
                audioCorrect.play();
                setbBackgroundPosY(currPos => currPos < 4 ? 0 : currPos - 5);
            } else {
                wrongAnswers.push(currentWord.id);
                audioWrong.play();
                setLives(lives => lives - 1);
            }
        }
        setTimeout(() => {
            setQuestionPosY(10);
            getNextWords();
        }, 1000)
    }

    const gameOver = () => {
        onSetAnswers({
            listCorrect: correctAnswers,
            listWrong: wrongAnswers,
        });
    }

    // const handleIncorrect = () => {
    //     const arr = wrongAnswers;
    //     arr.push(currentId);
    // }

    const getRandomWords = () => {
        const result = [];
        const questionWords = words.filter(({word}) => !excludeWords.some(el => el.word == word));
        if(questionWords.length === 0) {
            gameOver();
            return [];
        }
        result.push(questionWords[Math.floor(Math.random() * questionWords.length)])

        for(let i = 0; i < 3; i++) {
            let fromWords = words.filter(({word}) => !result.some(el => el.word == word));

            const rnd = Math.floor(Math.random() * fromWords.length);
            result.push(fromWords[rnd]);
        }
        return result;
    }

    if(!words) return <div>Loading...</div>

    const questionStyle = {
        top: `${questionPosY}px`
    }
    if(questionPosY == 10) questionStyle.transition = "unset";
    else if(questionPosY === WINDOW_HEIGHT) questionStyle.transition = "linear 1s"

    return (
        <div className="game-background" style={{backgroundPositionY: `${backgroundPosY}%`}}>
            <div className="header">
                <StyledRating
                    name="customized-color"
                    defaultValue={5}
                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    size={"large"}
                    readOnly={true}
                    value={lives}
                />
            </div>
            <div className="main">
                <div className="answer-variants" onClick={handlerAnswer}>
                    {
                        currentWords.map(({id, wordTranslate}, idx) => {
                            return <div className="word" key={idx}>{`${idx + 1} ${wordTranslate}`}</div>
                        })
                    }
                </div>
            </div>
            <div className="word question" style={questionStyle}>{currentWord?.word}</div>
        </div>
    );
};

export default Savanna;