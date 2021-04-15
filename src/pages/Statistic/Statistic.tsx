import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import DailyStats from '../../shared/DailyStats/DailyStats';
import LongStats from '../../shared/LongStats/LongStats';
import s from './Statistic.module.scss';

const Statistic = () => {
    const [currentPage, setCurrentPage] = useState('daily');
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.pathname.match('daily')) {
            setCurrentPage('daily');
        } else if (location.pathname.match('long')) {
            setCurrentPage('long');
        }
    }, [location]);

    return (
        <div className={s.root}>
            <h1>СТАТИСТИКА</h1>
            <nav className={s.navigation}>
                <button
                    type="button"
                    className={currentPage === 'daily' ? s.active : s.waiting}
                    onClick={() => history.push('/statistics/daily')}
                >
                    Дневная статистика
                </button>
                <button
                    type="button"
                    className={currentPage === 'long' ? s.active : s.waiting}
                    onClick={() => history.push('/statistics/long')}
                >
                    Долгосрочная статистика
                </button>
            </nav>
            <Route path="/statistics/daily" component={DailyStats} />
            <Route path="/statistics/long" component={LongStats} />
        </div>
    );
};

export default Statistic;
