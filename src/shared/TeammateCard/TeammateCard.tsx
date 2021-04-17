import React from 'react';
import ITeammate from '../../interfaces/ITeammate';
import s from './TeammateCard.module.scss';
import Git from '../../assets/Git.png';

interface ITeammateCard {
    data: ITeammate,
}

const TeammateCard = ({ data }: ITeammateCard) => (
    <div className={`${s.root} ${data.teamLead ? s.team_lead : ''}`}>
        <div className={s.avatar}>
            <img src={data.photo} alt={`${data.nickName}'s avatar`} />
        </div>
        <div className={s.nameBlock}>
            <span>{data.name}</span>
            <span>({data.nickName})</span>
        </div>

        <ul className={s.contributionList}>
            {data.contribution.map((item, index) => (
                <li key={`${index + 1}`}>{item}</li>
            ))}
        </ul>
        <div className={s.footer}>
            <a href={data.gitLink}>
                <img src={Git} alt="GitHUb" />
            </a>
        </div>
    </div>
);

export default TeammateCard;
