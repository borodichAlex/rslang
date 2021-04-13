import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import teamData from '../AboutTeam/teamData';
import s from './Footer.module.scss';
import RsSchool from '../../assets/RsSchool.svg';

const Footer: FC = () => {
    const location = useLocation();

    if (location.pathname.match(/games/)) {
        return null;
    }
    return (
        <div className={s.root}>
            <div className={s.toggle} />
            <div className={s.content}>
                <div className={s.centered_block}>
                    <ul className={s.members}>
                        {
                            teamData.map((member, index) => (
                                <li key={`${index + 1}`}>
                                    <a href={member.gitLink} target="blank">{member.nickName}</a>
                                </li>
                            ))
                        }
                    </ul>
                    <span>2021</span>
                </div>
                <div className={s.logo}>
                    <a href="https://rs.school/react/" target="blank">
                        <img src={RsSchool} alt="RsSchool" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
