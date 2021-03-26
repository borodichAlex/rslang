import React, { useEffect, useState } from 'react';
import playSound from '../../utils/playSound';
import { IWordObject } from '../../interfaces';
import getData from '../../utils/getData';
import s from './Sprint.module.scss';

const Sprint = () => {
    const [data, setData] = useState<IWordObject[] | []>([]);
    const [score, setScore] = useState(0);
    const [countDown, setCountDown] = useState(60);
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [isCorrect, setIsCorrect] = useState(0);

    useEffect(() => {
        getData('https://react-learnwords-example.herokuapp.com/words')
        .then((responce) => {
            setData(responce);
            console.log(responce);
        });
    }, []);

    useEffect(() => {
        console.log(data);
        data.length
        ? handleSetTask()
        : null;
    }, [data]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (countDown >= 1) {
                setCountDown(countDown - 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [countDown]);

    const handleSetTask = () => {
        const currindex = Math.floor(Math.random() * 20);
        const correctTranslation = Math.floor(Math.random() * 2);
        setIsCorrect(correctTranslation);
        setWord(data[currindex].word);
        correctTranslation
        ? setTranslation(data[currindex].wordTranslate)
        : setTranslation(data[handleGetIncorrectTranslation(currindex)].wordTranslate);
    };

    const handleGetIncorrectTranslation = (currIndex: number) => {
        let index = Math.floor(Math.random() * 20);
        if (index === currIndex) {
            index = handleGetIncorrectTranslation(currIndex);
        }
        return index;
    };

    return (
        <div className={s.root}>
            <div className={s.container}>
                <div className={s.timer}>{countDown}</div>
                {word || ''}
                {translation || ''}
            </div>
        </div>
    );
};

export default Sprint;
