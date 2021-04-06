import React from 'react';
import s from './Footer.module.scss';

const teamData: any = [
    {
        name: 'Alexandr Borodich',
        nickName: 'BorodichAlex',
        gitLink: 'https://github.com/PavelMGs',
        photo: 'https://www.ivi.ru/titr/uploads/2016/12/05/3c96b9e17a84fabb194cb759eac53d12.jpg/1400x0',
        contribution: ['ТимЛид', 'Создание и оформление игры Аудиовызов', 'Подбор темы, общего стиля для игр и всего приложения', 'Проработка логики и оформление общих компонентов для игр', 'Создание и оформление компонент Меню'],
        teamLead: true,
    },
    {
        name: 'Pavel Maslovskyi',
        nickName: 'PavelMGs',
        gitLink: 'https://github.com/PavelMGs',
        photo: 'https://www.meme-arsenal.com/memes/d25b7340298cb4982ccfe297b64e6190.jpg',
        contribution: ['Создание и оформление игры Спринт', 'Создание и оформление компонента "Список слов"', 'Создание и оформление компонента "О Команде"'],
        teamLead: false,
    },
    {
        name: 'Andrew Bezzubov',
        nickName: 'Nickomo',
        gitLink: 'https://github.com/Nickomo',
        photo: 'https://cutt.ly/YcUc6gI',
        contribution: ['Создание и оформление игры Саванна'],
        teamLead: false,
    },
    {
        name: 'StanislavcNarckevich',
        nickName: 'StanislavNarckevich',
        gitLink: 'https://github.com/StanislavNarckevich',
        photo: 'https://avatars.githubusercontent.com/u/54161181?v=4',
        contribution: ['Создание и оформление игры Своя Игра'],
        teamLead: false,
    },

];

// уберу после мёржа AboutTeam to develop

function Footer() {
    return (
        <div className={s.root}>
            Footer
            <ul className={s.members}>
                {
                    teamData.map((member: any) => (
                        <li>
                            <img src="link" alt="" />
                            <a href={member.gitLink} target="blank">{ member.nickName }</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Footer;
