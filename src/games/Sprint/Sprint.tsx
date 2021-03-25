import React, { useEffect, useState } from 'react';
import playSound from '../../hooks/playSound';
import { IWordObject } from '../../interfaces';
import getData from '../../utils/getData';
import s from './Sprint.module.scss';

const Sprint = () => {
    const [data, setData] = useState<IWordObject[] | []>([]);
    const [score, setScore] = useState(0);
    const [countDown, setCountDown] = useState(60);

    useEffect(() => {
        getData('https://react-learnwords-example.herokuapp.com/words')
        .then((responce) => {
            setData(responce);
            console.log(responce);
        });
    }, []);

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

    return (
        <div className={s.root}>
            <div className={s.container}>
                <div className={s.timer}>{countDown}</div>
            </div>
        </div>
    );
};

export default Sprint;
