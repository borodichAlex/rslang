/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useState } from 'react';
import { Pagination } from '@material-ui/lab';
import { CircularProgress, MenuItem, Select } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import s from './WordList.module.scss';
import Star from '../../assets/Star.png';
import ActiveStar from '../../assets/ActiveStar.png';
import Basket from '../../assets/Basket.png';
import { IWord } from '../../interfaces/IWord';
import getWords from '../../helpers/getWords';
import Word from '../Word/Word';
import authorizedRequest from '../../utils/AuthorizedRequest';
import { getUserId } from '../../utils/UserUtils';
import baseUrl from '../../helpers/baseUrl';

interface IWordList {
    handleChangeBack: any
}

const getData = async (url: string) => {
    const res = await authorizedRequest(url);
    return res;
};

const WordList = ({ handleChangeBack }: IWordList) => {
    const [data, setData] = useState<IWord[] | []>([]);
    const [loaded, setLoaded] = useState(false);
    const [deleted, setDeleted] = useState<string[]>([]);
    const [marked, setMarked] = useState<string[]>([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const { groupPath, pagePath } = useParams<any>();

    const [page, setPage] = useState(10);

    const history = useHistory();

    useEffect(() => {
        const userId = getUserId();
        handleChangeBack(groupPath);
        authorizedRequest(`${baseUrl}/users/${userId}/words?type=deleted`)
            .then((res) => {
                console.log(res);
                const arr = res.map((item: any) => item.wordId);
                setDeleted(arr);
            });
        authorizedRequest(`${baseUrl}/users/${userId}/words?type=difficult`)
            .then((res) => {
                console.log(res);
                const arr = res.map((item: any) => item.wordId);
                setMarked(arr);
            });
    }, []);

    useEffect(() => {
        setPage(pagePath);
        handleChangeBack(groupPath);
        getWords(groupPath, pagePath - 1)
            .then((res) => {
                const newData = res.filter((item) => !deleted.includes(item.id));
                setData(newData);
                setLoaded(true);
            });
    }, [groupPath, pagePath, deleted, marked]);

    useEffect(() => {
        const newData = data.filter((item) => !deleted.includes(item.id));
        setData(newData);
    }, [ignored]);

    const deleteWord = async (id: string) => {
        const newArr = deleted;
        newArr.push(id);
        setDeleted(newArr);
        forceUpdate();
        const res = await authorizedRequest(`${baseUrl}/users/${getUserId()}/words/${id}`, JSON.stringify({
            type: 'deleted',
        }), 'POST');
    };

    const saveWord = async (id: string) => {
        if (!marked.includes(id)) {
            const newArr = marked;
            newArr.push(id);
            setMarked(newArr);
            forceUpdate();
            const res = await authorizedRequest(`${baseUrl}/users/${getUserId()}/words/${id}`, JSON.stringify({
                type: 'difficult',
            }), 'POST');
        } else {
            authorizedRequest(`${baseUrl}/users/${getUserId()}/words/${id}?type=difficult`, null, 'DELETE');
            const newArr = marked.filter((item) => item !== id);
            setMarked(newArr);
        }
    };

    if (!loaded) {
        return (
            <div className={s.loading}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={s.page}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={groupPath}
                onChange={(e: React.ChangeEvent<{ value: any }>) => {
                    history.push(`/textbook/common/${e.target.value}/${1}`);
                    handleChangeBack(e.target.value);
                }}
                className={s.select}
            >
                <MenuItem value="0">A1</MenuItem>
                <MenuItem value="1">A2</MenuItem>
                <MenuItem value="2">B1</MenuItem>
                <MenuItem value="3">B2</MenuItem>
                <MenuItem value="4">C1</MenuItem>
                <MenuItem value="5">C2</MenuItem>
                {/* список генерировать лучше из [A1, A2, ...] */}
            </Select>

            <Pagination
                count={30}
                size="large"
                onChange={(e, value) => history.push(`/textbook/common/${groupPath}/${value}`)}
                page={Number(pagePath)}
                className={s.pagination}
            />

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
                                    onClick={() => saveWord(item.id)}
                                >
                                    <img src={marked.includes(item.id) ? ActiveStar : Star} alt={marked.includes(item.id) ? 'saved' : 'Save'} />        {/* условие, проверяющее наличие слова в сохранённых */}
                                </button>
                                <button
                                    type="button"
                                    className={s.basket_button}
                                    onClick={() => deleteWord(item.id)}
                                >
                                    <img src={Basket} alt="Delete" />
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

export default WordList;
