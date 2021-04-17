import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import WordList from '../../shared/WordList/WordList';
import HardList from '../../shared/HardList/HardList';
import Settings from '../../assets/Settings.png';
import s from './TextBook.module.scss';
import DeletedList from '../../shared/DeletedList/DeletedList';
import InLearn from '../../shared/InLearn/InLearn';

const TextBook = () => {
    const [background, setBackground] = useState('url(https://res.cloudinary.com/rslangteam33/image/upload/v1618680130/backgrounds/bg_game_audioChallenge_copy)');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [textControls, setTextControls] = useState('Не отображать перевод');
    const [textTranslation, setTextTranslation] = useState('Скрыть элементы управления');

    const history = useHistory();

    useEffect(() => {
        localStorage.getItem('showTranslation') !== null
            ? null
            : localStorage.setItem('showTranslation', JSON.stringify(true));

        localStorage.getItem('showControls') !== null
            ? null
            : localStorage.setItem('showControls', JSON.stringify(true));

        if (JSON.parse(localStorage.getItem('showTranslation') || 'true')) {
            setTextTranslation('Не отображать перевод');
        } else {
            setTextTranslation('Отображать перевод');
        }

        if (JSON.parse(localStorage.getItem('showControls') || 'true')) {
            setTextControls('Скрыть элементы управления');
        } else {
            setTextControls('Показать элементы управления');
        }
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: any) => {
        if (event.target.id === 'show-translation') {
            if (JSON.parse(localStorage.getItem('showTranslation') || 'true')) {
                localStorage.setItem('showTranslation', JSON.stringify(false));
                setTextTranslation('Отображать перевод');
            } else {
                localStorage.setItem('showTranslation', JSON.stringify(true));
                setTextTranslation('Не отображать перевод');
            }
        } else if (event.target.id === 'show-controls') {
            if (JSON.parse(localStorage.getItem('showControls') || 'true')) {
                localStorage.setItem('showControls', JSON.stringify(false));
                setTextControls('Показать элементы управления');
            } else {
                localStorage.setItem('showControls', JSON.stringify(true));
                setTextControls('Скрыть элементы управления');
            }
        }
        setAnchorEl(null);
    };

    const handleChangeBack = (group = 0) => {
        const groupN = Number(group);

        const bgA1 = 'url(https://res.cloudinary.com/rslangteam33/image/upload/v1618680130/backgrounds/bg_game_audioChallenge_copy) fixed';
        const bgA2 = 'url(https://res.cloudinary.com/rslangteam33/image/upload/v1618680130/backgrounds/bg_game_word_constructor) fixed';
        const bgB1 = 'url(https://res.cloudinary.com/rslangteam33/image/upload/v1618680130/backgrounds/deers_xeb95l) fixed';
        const bgB2 = 'url(https://res.cloudinary.com/rslangteam33/image/upload/v1618680130/backgrounds/bg_game_audioChallenge) fixed';
        const bgC1 = 'url(https://res.cloudinary.com/rslangteam33/image/upload/v1618680130/backgrounds/bridge_dirrdn) fixed';
        const bgC2 = 'url(https://res.cloudinary.com/rslangteam33/image/upload/v1618680130/backgrounds/bg_game_sprint) fixed';

        const bgColors = [bgA1, bgA2, bgB1, bgB2, bgC1, bgC2];
        setBackground(bgColors[groupN]);
    };

    return (
        <div
            className={s.root}
            style={{
                background,
                backgroundSize: 'cover',
                backgroundRepeat: 'no repeat',
              }}
        >
            <div className={s.header}>
                <button
                    type="button"
                    className={s.switch_page}
                    onClick={() => {
                        history.push('/textbook/common/0/1');
                    }}
                >
                    Все слова
                </button>
                <button
                    type="button"
                    className={s.switch_page}
                    onClick={() => {
                        history.push('/textbook/inlearn');
                    }}
                >
                    Изучаемые слова
                </button>
                <button
                    type="button"
                    className={s.switch_page}
                    onClick={() => {
                        history.push('/textbook/hardwords');
                    }}
                >
                    Сложные слова
                </button>
                <button
                    type="button"
                    className={s.switch_page}
                    onClick={() => {
                        history.push('/textbook/deleted');
                    }}
                >
                    Удаленные слова
                </button>
                <Button className={s.settings_button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <img src={Settings} alt="Настройки" />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem id="show-translation" onClick={handleClose}>{textTranslation}</MenuItem>
                    <MenuItem id="show-controls" onClick={handleClose}>{textControls}</MenuItem>
                </Menu>
            </div>
            <Switch>
                <Route path="/textbook/common/:groupPath/:pagePath">
                    <WordList handleChangeBack={handleChangeBack} />
                </Route>
                <Route path="/textbook/inlearn">
                    <InLearn />
                </Route>
                <Route path="/textbook/hardwords">
                    <HardList />
                </Route>
                <Route path="/textbook/deleted">
                    <DeletedList />
                </Route>
            </Switch>
        </div>
    );
};

export default TextBook;
