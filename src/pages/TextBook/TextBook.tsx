import React, { useState } from 'react';
import WordList from '../../shared/WordList/WordList';
import s from './TextBook.module.scss';

const TextBook = () => {
    const [background, setBackground] = useState('skyblue');

    const handleChangeBack = (group = 0) => {
        const groupN = Number(group);//  залетает строка
        switch (groupN) {
            case 0: {
                setBackground('skyblue');
                break;
            }

            case 1: {
                setBackground('rgb(85, 151, 209)');
                break;
            }

            case 2: {
                setBackground('lime');
                break;
            }

            case 3: {
                setBackground('limegreen');
                break;
            }

            case 4: {
                setBackground('rgb(238, 123, 238)');
                break;
            }

            case 5: {
                setBackground('rgb(213, 29, 213)');
                break;
            }

            default: {
                setBackground('white');
                break;
            }
        }
};

    return (
        <div
            className={s.root}
            style={{ backgroundColor: background}}
        >
            <WordList handleChangeBack={handleChangeBack} />
        </div>
    );
};

export default TextBook;
