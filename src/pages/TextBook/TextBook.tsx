import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import WordList from '../../shared/WordList/WordList';
import Settings from '../../assets/Settings.png';
import s from './TextBook.module.scss';

const TextBook = () => {
    const [background, setBackground] = useState('skyblue');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [textControls, setTextControls] = useState('Не отображать перевод');
    const [textTranslation, setTextTranslation] = useState('Скрыть элементы управления');

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
        const bgColors = ['skyblue', 'rgb(85, 151, 209)', 'lime', 'limegreen', 'rgb(238, 123, 238)', 'rgb(213, 29, 213)'];
        setBackground(bgColors[groupN]);
    };

    return (
        <div
            className={s.root}
            style={{ backgroundColor: background }}
        >
            <div className={s.header}>
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
                    <MenuItem id="show-translation" onClick={handleClose}>{ textTranslation }</MenuItem>
                    <MenuItem id="show-controls" onClick={handleClose}>{ textControls }</MenuItem>
                </Menu>
            </div>
            <WordList handleChangeBack={handleChangeBack} />
        </div>
    );
};

export default TextBook;
