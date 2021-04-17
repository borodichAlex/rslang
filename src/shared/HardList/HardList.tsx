/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useState } from 'react';
import ActiveStar from '../../assets/ActiveStar.png';
import { IWord } from '../../interfaces/IWord';
import s from './HardList.module.scss';
// import getWords from '../../helpers/getWords';
import Word from '../Word/Word';
import authorizedRequest from '../../utils/AuthorizedRequest';
import baseUrl from '../../helpers/baseUrl';
import { getUserId } from '../../utils/UserUtils';
import getData from '../../helpers/getData';

const userId = getUserId();

const HardList = () => {
    const [data, setData] = useState<IWord[] | []>([]);
    const [ids, setIds] = useState([]);
    const [marked, setMarked] = useState<string[]>([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        authorizedRequest(`${baseUrl}/users/${userId}/words?type=difficult`)
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

    const unsaveWord = (id: string) => {
        authorizedRequest(`${baseUrl}/users/${userId}/words/${id}?type=difficult`, null, 'DELETE');
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
                                    className={s.star_button}
                                    onClick={() => unsaveWord(item.id)}
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
