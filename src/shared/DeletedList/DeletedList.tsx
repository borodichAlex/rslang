/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useState } from 'react';
import Restore from '../../assets/Restore.png';
import { IWord } from '../../interfaces/IWord';
import s from './DeletedList.module.scss';
import Word from '../Word/Word';
import authorizedRequest from '../../utils/AuthorizedRequest';
import { getUserId } from '../../utils/UserUtils';
import baseUrl from '../../helpers/baseUrl';
import getData from '../../helpers/getData';

const userId = getUserId();

const DeletedList = () => {
    const [data, setData] = useState<IWord[] | []>([]);
    const [ids, setIds] = useState([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        authorizedRequest(`${baseUrl}/users/${userId}/words?type=deleted`)
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

    const restoreWord = (id: string) => {
        authorizedRequest(`${baseUrl}/users/${userId}/words/${id}?type=deleted`, null, 'DELETE');
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
                                    className={s.restore_button}
                                    onClick={() => {
                                        console.log('Restore Word');
                                        restoreWord(item.id);
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
