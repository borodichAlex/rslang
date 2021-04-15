/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useState } from 'react';
import { Pagination } from '@material-ui/lab';
import { MenuItem, Select } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import s from './WordList.module.scss';
import Sound from '../../assets/Sound.png';
import Star from '../../assets/Star.png';
import ActiveStar from '../../assets/ActiveStar.png';
import Basket from '../../assets/Basket.png';
import { urlBaseDataWords } from '../../pages/games/common/GamePage';
import { IWord } from '../../interfaces/IWord';
import getWords from '../../helpers/getWords';
import Word from '../Word/Word';

interface IWordList {
    handleChangeBack: any
}

const WordList = ({ handleChangeBack }: IWordList) => {
    const [data, setData] = useState<IWord[] | []>([]);
    const [deleted, setDeleted] = useState<string[]>([]);
    const [marked, setMarked] = useState<string[]>([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const { groupPath, pagePath } = useParams<any>();

    const [page, setPage] = useState(10);

    const history = useHistory();

    useEffect(() => {
        handleChangeBack(groupPath);
    }, []);

    useEffect(() => {
        setPage(pagePath);
        handleChangeBack(groupPath);
        getWords(groupPath, pagePath - 1)
            .then((res) => {
                const newData = res.filter((item) => !deleted.includes(item.id));
                setData(newData);
            });
    }, [groupPath, pagePath]);

    useEffect(() => {
        const newData = data.filter((item) => !deleted.includes(item.id));
        setData(newData);
    }, [ignored]);

    const audioNode = new Audio();

    const handlePlayAudio = (audioUrl: string) => {
        const url = urlBaseDataWords + audioUrl;
        const isNewUrl = url !== audioNode.currentSrc;
        const isPlaying = !audioNode.ended;

        if (isNewUrl) {
            if (isPlaying) {
                audioNode.pause();
            }
            audioNode.src = url;
        } else if (isPlaying) {
            audioNode.currentTime = 0;
        }

        audioNode.play();
    };

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
                ) : <div>No words on this page</div>
            }
        </div>
    );
};

export default WordList;
