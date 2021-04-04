import React, { useEffect, useRef, useState } from 'react';
import playSound from '../../utils/playSound';
import s from './Sprint.module.scss';
import Check from '../../assets/Check.png';
import Back from '../../assets/Back.png';
import Error from '../../assets/Error.mp3';
import Correct from '../../assets/Correct.mp3';
import { IWord } from '../../interfaces/IWord';
import { IAnswersGame } from '../../pages/games/common/GamePage';
import ToggleFullScreen from '../../pages/games/common/ToggleFullScreen';

interface IProps {
    words: IWord[];
    onSetPage: (page: string) => void;
    onSetAnswers: (answers: IAnswersGame) => void;
}

const Sprint = ({ words, onSetPage, onSetAnswers }: IProps) => {
    const [score, setScore] = useState(0);
    const [countDown, _setCountDown] = useState(0);
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [isCorrect, setIsCorrect] = useState(0);
    const [streak, setStreak] = useState(0);
    const [factor, setFactor] = useState(1);
    const [containerClass, setContainerClass] = useState('container');
    const [color, setColor] = useState('rgb(255, 255, 255, 0.0)');
    const [lastWord, setLastWord] = useState<any>([]);
    const [correctTransl, setCorrectTransl] = useState('');
    const [currentId, setCurrentId] = useState('');

    const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

    const countDownRef = useRef(countDown);

    const setCountDown = (newData: number) => {
        countDownRef.current = newData;
        _setCountDown(newData);
    };

    useEffect(() => {
        handleStartGame();
    }, []);

    useEffect(() => {
        document.addEventListener('keyup', handleAnswer);

        return () => {
            document.removeEventListener('keyup', handleAnswer);
        };
    }, [word]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (countDown >= 1) {
                setCountDown(countDown - 1);
            } else {
                clearInterval(interval);
                onSetAnswers({
                    listCorrect: correctAnswers,
                    listWrong: wrongAnswers,
                });
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [countDown]);

    const handleStartGame = () => {
        handleSetTask();
        setContainerClass('container');
        setCountDown(60);
        setColor('rgb(255, 255, 255, 0.0)');
        setScore(0);
        setFactor(1);
        setStreak(0);
    };

    const handleIncorrect = () => {
        setContainerClass('containerR');
        setTimeout(() => setContainerClass('container'), 500);
        score ? setScore((prewScore) => prewScore - 10) : null;
        setColor('rgb(255, 255, 255, 0.0)');
        setStreak(0);
        setFactor(1);
        playSound(Error);
        const newArr = lastWord;
        newArr.unshift(<div>Неверно: {word} переводится как {correctTransl}</div>);
        setLastWord(newArr);
        const newAnswers = wrongAnswers;
        newAnswers.push(currentId);
        setWrongAnswers(newAnswers);
    };

    const handleCorrect = () => {
        setContainerClass('containerG');
        setTimeout(() => setContainerClass('container'), 500);
        setScore((prewScore) => prewScore + 10 * factor);
        playSound(Correct);
        if (streak < 3) {
            setStreak(streak + 1);
        } else if (factor < 7) {
            setStreak(0);
            setFactor(factor + 2);
            if (factor === 1) {
                setColor('rgba(0, 255, 255, 0.17)');
            } else if (factor === 3) {
                setColor('rgba(0, 255, 139, 0.17)');
            } else if (factor === 5) {
                setColor('rgba(0, 255, 0, 0.17)');
            }
        }
        const newArr = lastWord;
        newArr.unshift(<div>Верно: {word} переводится как {correctTransl}</div>);
        setLastWord(newArr);
        const newAnswers = correctAnswers;
        newAnswers.push(currentId);
        setCorrectAnswers(newAnswers);
    };

    const handleAnswer = (e: KeyboardEvent) => {
        if (countDownRef.current) {
            if (e.key === 'ArrowRight') {
                if (isCorrect) {
                    handleCorrect();
                } else {
                    handleIncorrect();
                }
            } else if (e.key === 'ArrowLeft') {
                if (!isCorrect) {
                    handleCorrect();
                } else {
                    handleIncorrect();
                }
            }
            handleSetTask();
        }
    };

    const handleAnswerButtons = (answer: boolean) => {
        if (countDownRef.current) {
            if (answer) {
                if (isCorrect) {
                    handleCorrect();
                } else handleIncorrect();
            } else if (!answer) {
                if (!isCorrect) {
                    handleCorrect();
                } else handleIncorrect();
            }
            handleSetTask();
        }
    };

    const handleSetTask = () => {
        const currindex = Math.floor(Math.random() * 600);
        const correctTranslation = Math.floor(Math.random() * 2);
        setIsCorrect(correctTranslation);
        setCurrentId(words[currindex].id);
        setWord(words[currindex].word);
        setCorrectTransl(words[currindex].wordTranslate);
        correctTranslation
            ? setTranslation(words[currindex].wordTranslate)
            : setTranslation(words[handleGetIncorrectTranslation(currindex)]
                .wordTranslate);
    };

    const handleGetIncorrectTranslation = (currIndex: number) => {
        let index = Math.floor(Math.random() * 20);
        if (index === currIndex) {
            index = handleGetIncorrectTranslation(currIndex);
        }
        return index;
    };

    const streakRender = () => {
        const content = [];
        for (let i = streak; i > 0; i--) {
            content.push(<img src={Check} alt="v" width="24" />);
        }
        return content;
    };

    return (
        <div className={s.root}>
            <div className={s.toggleFullScreen}>
                <ToggleFullScreen />
            </div>

            <button
                type="button"
                onClick={() => onSetPage('MENU_PAGE')}
                className={s.exit}
            >
                <img src={Back} alt="Back" />
            </button>
            <div className={s.score}>
                {score}
            </div>
            <div className={s[containerClass]}>
                <div className={s.header} style={{ backgroundColor: color }}>
                    <div className={s.streak}>
                        {streakRender()}
                    </div>
                    <span className={s.factor}>
                        + {factor * 10} очков за слово
                    </span>
                </div>
                <div className={s.timer}>{countDown}</div>
                <span className={s.word}>
                    {word || ''}
                </span>
                <span className={s.translation}>
                    {translation || ''}
                </span>

                <div className={s.buttons}>
                    <button
                        type="button"
                        onClick={() => handleAnswerButtons(false)}
                    >
                        Неверно
                    </button>

                    <button
                        type="button"
                        onClick={() => handleAnswerButtons(true)}
                    >
                        Верно
                    </button>
                </div>
            </div>
            <div className={s.lastWords}>
                {lastWord.reverse().map((item: any) => item)}
            </div>
        </div>
    );
};

export default Sprint;
