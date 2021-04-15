/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useState } from 'react';
import Restore from '../../assets/Restore.png';
import { IWord } from '../../interfaces/IWord';
import s from './DeletedList.module.scss';
import getWords from '../../helpers/getWords';
import Word from '../Word/Word';

const DeletedList = () => {
    const [data, setData] = useState<IWord[] | []>([]);

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
                                    className={s.restore_button}
                                    onClick={() => {
                                        console.log('Restore Word');
                                    }}
                                >
                                    <img src={Restore} alt="Restore" />
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

export default DeletedList;
