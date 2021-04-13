import React, { useEffect } from 'react';
import s from './Statistic.module.scss';

const Statistic = () => {
    useEffect(() => {
        console.log('console');
    }, []);

    return (
        <div className={s.root}>
            <h1>СТАТИСТИКА</h1>
            <div className={s.container}>
                <div className={`${s.audio_block} ${s.block}`}>
                    <h2 className={s.header}>
                        АудиоВызов
                    </h2>
                    <div className={s.total_words}>
                        Слов изучено: <span className={s.stat}>384</span>
                    </div>
                    <div className={s.ratio}>
                        Правильных ответов: <span className={s.stat}>65%</span>
                    </div>
                    <div className={s.streak}>
                        Самая длинная серия: <span className={s.stat}>15</span>
                    </div>
                </div>
                <div className={`${s.sprint_block} ${s.block}`}>
                    <h2 className={s.header}>
                        Спринт
                    </h2>
                    <div className={s.total_words}>
                        Слов изучено: <span className={s.stat}>384</span>
                    </div>
                    <div className={s.ratio}>
                        Правильных ответов: <span className={s.stat}>65%</span>
                    </div>
                    <div className={s.streak}>
                        Самая длинная серия: <span className={s.stat}>15</span>
                    </div>
                </div>
                <div className={`${s.savanna_block} ${s.block}`}>
                    <h2 className={s.header}>
                        Саванна
                    </h2>
                    <div className={s.total_words}>
                        Слов изучено: <span className={s.stat}>384</span>
                    </div>
                    <div className={s.ratio}>
                        Правильных ответов: <span className={s.stat}>65%</span>
                    </div>
                    <div className={s.streak}>
                        Самая длинная серия: <span className={s.stat}>15</span>
                    </div>
                </div>
                <div className={`${s.constructor_block} ${s.block}`}>
                    <h2 className={s.header}>
                        Конструктор Слов
                    </h2>
                    <div className={s.total_words}>
                        Слов изучено: <span className={s.stat}>384</span>
                    </div>
                    <div className={s.ratio}>
                        Правильных ответов: <span className={s.stat}>65%</span>
                    </div>
                    <div className={s.streak}>
                        Самая длинная серия: <span className={s.stat}>15</span>
                    </div>
                </div>
            </div>
                <div className={s.day_learned}>
                    Всего изученно слов: <span className={s.stat}>1536</span>
                </div>
                <div className={s.day_ratio}>
                    Процент правильных ответов за день: <span className={s.stat}>65%</span>
                </div>
        </div>
    );
};

export default Statistic;
