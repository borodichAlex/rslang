/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useState } from 'react';
import s from './InLearn.module.scss';
import Star from '../../assets/Star.png';
import ActiveStar from '../../assets/ActiveStar.png';
import Basket from '../../assets/Basket.png';
import { IWord } from '../../interfaces/IWord';
import getWords from '../../helpers/getWords';
import Word from '../Word/Word';

const InLearn = () => {
    const [data, setData] = useState<IWord[] | []>([]);
    const [deleted, setDeleted] = useState<string[]>([]);
    const [marked, setMarked] = useState<string[]>([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        getWords(0, 0)
            .then((res) => {
                const newData = res.filter((item) => !deleted.includes(item.id));
                setData(newData);
            });
    }, [ignored]);

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
                                <img src={marked.includes(item.id) ? ActiveStar : Star} alt={true ? 'saved' : 'Save'} />        {/* условие, проверяющее наличие слова в сохранённых */}
                            </button>
                            <button
                                type="button"
                                className={s.basket_button}
                                onClick={() => {
                                    const newArr = deleted;
                                    newArr.push(item.id);
                                    setDeleted(newArr);
                                    forceUpdate();
                                }}
                            >
                                <img src={Basket} alt="Delete" />
                            </button>
                        </div>
                            <Word item={item} index={index} />
                    </div>
                ))
            )
            : <div>No words on this page</div>
        }
        </div>
    );
};

export default InLearn;
