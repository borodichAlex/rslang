import React, { useEffect } from 'react';
import TeammateCard from '../TeammateCard/TeammateCard';
import teamData from './teamData';
import s from './AboutTeam.module.scss';

const AboutTeam = () => {
    useEffect(() => {
        console.log('Ok');
    }, []);

    return (
        <div className={s.root}>
            {teamData.map((teammate: any) => (
                    <TeammateCard data={teammate} />
                ))}
        </div>
    );
};

export default AboutTeam;
