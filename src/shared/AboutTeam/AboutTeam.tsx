import React from 'react';
import TeammateCard from '../TeammateCard/TeammateCard';
import teamData from './teamData';
import s from './AboutTeam.module.scss';

const AboutTeam = () => (
    <div className={s.root}>
        {teamData.map((teammate: any, index: number) => (
            <TeammateCard key={`${index + 1}`} data={teammate} />
        ))}
    </div>
);

export default AboutTeam;
