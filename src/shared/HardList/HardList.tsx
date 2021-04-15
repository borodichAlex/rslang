/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useState } from 'react';
import ActiveStar from '../../assets/ActiveStar.png';
import { IWord } from '../../interfaces/IWord';
import s from './HardList.module.scss';
import getWords from '../../helpers/getWords';
import Word from '../Word/Word';

const HardList = () => {
    const [data, setData] = useState<IWord[] | []>([]);
    const [marked, setMarked] = useState<string[]>([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        getWords(0, 0)
            .then((res) => {
                setData(res);
            });
    }, []);

    return (
        <div className={s.page}>
            {
                (data.length) ? (
                    data?.map((item: IWord, index: number) => (
                        <div className={s.wordBlock} key={`${item.id}list`}>
                            <div
                                className={JSON.parse(localStorage.getItem('showControls') || 'true')
                                    ? s.controls
                                    : s.hidden}
                            >
                                <button
                                    type="button"
                                    className={s.star_button}
                                    onClick={() => {
                                        let newMarked = marked;
                                        marked.includes(item.id)
                                            ? (newMarked = newMarked
                                                .filter((mark) => mark !== item.id))
                                            : newMarked.push(item.id);
                                        setMarked(newMarked);
                                        forceUpdate();
                                    }}
                                >
                                    <img src={ActiveStar} alt="UnSave" />
                                </button>
                            </div>
                            <Word item={item} index={index} />
                        </div>
                    ))
                ) : <div>No words on this page</div>
            }
        </div>
    );
};

export default HardList;
