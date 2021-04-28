/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useState } from 'react';
import s from './InLearn.module.scss';
import CheckMark from '../../assets/CheckMark.png';
import { IWord } from '../../interfaces/IWord';
import Word from '../Word/Word';
import authorizedRequest from '../../utils/AuthorizedRequest';
import baseUrl from '../../helpers/baseUrl';
import { getUserId } from '../../utils/UserUtils';
import getData from '../../helpers/getData';

const InLearn = () => {
    const [data, setData] = useState<IWord[] | []>([]);
    const [deleted, setDeleted] = useState<string[]>([]);
    const [ids, setIds] = useState([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        authorizedRequest(`${baseUrl}/users/${getUserId()}/words?type=inlearn`)
        .then((res) => {
            console.log('###', res);
            const arr = res.map((item: any) => item.wordId);
            setIds(arr);
        });
    }, []);

    useEffect(() => {
        ids.map((id) => {
            getData(id)
            .then((res) => {
                const newArr: any = data;
                newArr.push(res);
                setData(newArr);
                forceUpdate();
            });
        });
    }, [ids]);

    const handleLearned = (id: string) => {
        authorizedRequest(`${baseUrl}/users/${getUserId()}/words/${id}?type=inlearn`, null, 'DELETE');
        const newArr = data.filter((item) => item.id !== id);
        setData(newArr);
    };

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
                                className={s.basket_button}
                                onClick={() => handleLearned(item.id)}
                            >
                                <img src={CheckMark} alt="Learned" />
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
