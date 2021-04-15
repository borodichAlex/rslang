import React, { useEffect } from 'react';
import s from './LongStats.module.scss';

const LongStats = () => {
    useEffect(() => {
        console.log('Long');
    }, []);
    return (
        <div className={s.root}>
            asd
        </div>
    );
};

export default LongStats;
