import React, { useEffect, useRef, useState } from 'react';
import playSound from '../../utils/playSound';
import getData from '../../utils/getData';
import s from './Sprint.module.scss';
import Check from '../../assets/Check.png';
import Error from '../../assets/Error.mp3';
import Correct from '../../assets/Correct.mp3';
import Replay from '../../assets/Replay.png';

const Sprint = () => {
    const [score, setScore] = useState(0);
    const [countDown, _setCountDown] = useState(0);
    const [complexity, _setComplexity] = useState(0);
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [isCorrect, _setIsCorrect] = useState(0);
    const [streak, _setStreak] = useState(0);
    const [factor, _setFactor] = useState(1);
    const [gameOverClass, _setGameOverClass] = useState('gameOver_hidden');
    const [containerClass, setContainerClass] = useState('container');
    const [color, setColor] = useState('rgb(255, 255, 255)');
    const [lastWord, _setLastWord] = useState<any>([]);
    const [correctTransl, _setCorrectTransl] = useState('');

    const isCorrectRef = useRef(isCorrect);
    const countDownRef = useRef(countDown);
    const complexityRef = useRef(complexity);
    const streakRef = useRef(streak);
    const gameOverClassRef = useRef(gameOverClass);
    const factorRef = useRef(factor);
    const lastWordRef = useRef(lastWord);
    const correctTranslRef = useRef(correctTransl);

    const setCorrectTransl = (newData: string) => {
        correctTranslRef.current = newData;
        _setCorrectTransl(newData);
    };

    const setLastWord = (newData: any) => {
        lastWordRef.current = newData;
        _setLastWord(newData);
    };

    const setIsCorrect = (newData: number) => {
        isCorrectRef.current = newData;
        _setIsCorrect(newData);
    };

    const setCountDown = (newData: number) => {
        countDownRef.current = newData;
        _setCountDown(newData);
    };

    const setComplexity = (newData: number) => {
        complexityRef.current = newData;
        _setComplexity(newData);
    };

    const setStreak = (newData: number) => {
        streakRef.current = newData;
        _setStreak(newData);
    };

    const setGameOverClass = (newData: string) => {
        gameOverClassRef.current = newData;
        _setGameOverClass(newData);
    };

    const setFactor = (newData: number) => {
        factorRef.current = newData;
        _setFactor(newData);
    };

    useEffect(() => {
        handleStartGame();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (countDown >= 1) {
                setCountDown(countDown - 1);
            } else {
                clearInterval(interval);
                setGameOverClass('gameOver');
                setWord('');
                setTranslation('');
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [countDown]);

    const handleStartGame = () => {
        handleSetTask();
        setContainerClass('container');
        document.addEventListener('keyup', handleAnswer);
        setCountDown(60);
        setColor('white');
        setScore(0);
        setGameOverClass('gameOver_hidden');
        setFactor(1);
        setStreak(0);
    };

    const handleIncorrect = () => {
        setContainerClass('containerR');
        setTimeout(() => setContainerClass('container'), 500);
        score ? setScore((prewScore) => prewScore - 10) : null;
        setColor('white');
        setStreak(0);
        setFactor(1);
        playSound(Error);
        const newArr = lastWordRef.current;
        newArr.unshift(<div>Неверно: {word} переводится как {correctTranslRef.current}</div>);
        setLastWord(newArr);
    };

    const handleCorrect = () => {
        setContainerClass('containerG');
        setTimeout(() => setContainerClass('container'), 500);
        setScore((prewScore) => prewScore + 10 * factorRef.current);
        playSound(Correct);
        if (streakRef.current < 3) {
            setStreak(streakRef.current + 1);
        } else if (factorRef.current < 7) {
            setStreak(0);
            setFactor(factorRef.current + 2);
            if (factor === 1) {
                setColor('aqua');
            } else if (factor === 3) {
                setColor('lime');
            } else if (factor === 5) {
                setColor('rgb(243, 92, 92)');
            }
        }
        const newArr = lastWordRef.current;
        newArr.unshift(<div>Верно: {word} переводится как {correctTranslRef.current}</div>);
        setLastWord(newArr);
    };

    const handleAnswer = (e: KeyboardEvent) => {
        if (countDownRef.current) {
            if (e.key === 'ArrowRight') {
                if (isCorrectRef.current) {
                    handleCorrect();
                } else {
                    handleIncorrect();
                }
            } else if (e.key === 'ArrowLeft') {
                if (!isCorrectRef.current) {
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
                if (isCorrectRef.current) {
                    handleCorrect();
                } else handleIncorrect();
            } else if (!answer) {
                if (!isCorrectRef.current) {
                    handleCorrect();
                } else handleIncorrect();
            }
            handleSetTask();
        }
    };

    const handleSetTask = () => {
        const page = Math.floor(Math.random() * 30);
        getData(`https://react-learnwords-example.herokuapp.com/words?group=${complexity}&page=${page}`)
            .then((responce) => {
                const currindex = Math.floor(Math.random() * 20);
                const correctTranslation = Math.floor(Math.random() * 2);
                setIsCorrect(correctTranslation);
                setWord(responce[currindex].word);
                setCorrectTransl(responce[currindex].wordTranslate);
                correctTranslation
                    ? setTranslation(responce[currindex].wordTranslate)
                    : setTranslation(responce[handleGetIncorrectTranslation(currindex)]
                        .wordTranslate);
            });
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
            <div className={s.settings}>
                <div>Уровень сложности</div>
                <button
                    type="button"
                    onClick={() => setComplexity(0)}
                >
                    1
                </button>

                <button
                    type="button"
                    onClick={() => setComplexity(1)}
                >
                    2
                </button>

                <button
                    type="button"
                    onClick={() => setComplexity(2)}
                >
                    3
                </button>

                <button
                    type="button"
                    onClick={() => setComplexity(3)}
                >
                    4
                </button>

                <button
                    type="button"
                    onClick={() => setComplexity(4)}
                >
                    5
                </button>

                <button
                    type="button"
                    onClick={() => setComplexity(5)}
                >
                    6
                </button>
            </div>
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

            <div className={s[gameOverClass]}>
                <span>Игра окончена</span>
                <span>Счёт: {score} </span>
                <button
                    onClick={handleStartGame}
                    type="button"
                >
                    <img src={Replay} alt="Заново" />
                </button>
            </div>
            <div className={s.lastWords}>
                {lastWord.reverse().map((item: any) => item)}
            </div>
        </div>
    );
};

export default Sprint;
