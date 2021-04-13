const teamData: ITeamData[] = [
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
        photo: 'https://avatars.githubusercontent.com/u/67228385?v=4',
        contribution: ['Создание и оформление игры Спринт', 'Создание и оформление учебника и всех его компонентов', 'Создание и оформление компонента "О Команде"'],
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
        contribution: ['Создание и оформление игры Конструктор Слов'],
        teamLead: false,
    },

];

export interface ITeamData {
    name: string
    nickName: string
    gitLink: string
    photo: string
    contribution: string[]
    teamLead: boolean
}

export default teamData;
