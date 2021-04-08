/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useState } from 'react';
import { Pagination } from '@material-ui/lab';
import { MenuItem, Select } from '@material-ui/core';
import s from './WordList.module.scss';
import Sound from '../../assets/Sound.png';
import Star from '../../assets/Star.png';
import ActiveStar from '../../assets/ActiveStar.png';
import Basket from '../../assets/Basket.png';
import { urlBaseDataWords } from '../../pages/games/common/GamePage';
import { IWord } from '../../interfaces/IWord';
import getWords from '../../helpers/getWords';

interface IWordList {
    handleChangeBack: any
}

const WordList = ({ handleChangeBack } : IWordList) => {
    const [data, setData] = useState<IWord[] | []>([]);
    const [deleted, setDeleted] = useState<string[]>([]);
    const [marked, setMarked] = useState<string[]>([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [page, setPage] = useState(0);
    const [group, setGroup] = useState<number>(0);

    const handleChangeGroup = (e: React.ChangeEvent<{ value: any }>) => {
        setGroup(e.target.value);
        handleChangeBack(e.target.value);
    };

    useEffect(() => {
        getWords(group, page)
            .then((res) => {
                const newData = res.filter((item) => !deleted.includes(item.id));
                setData(newData);
            });
    }, [group, page]);

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

    if (!data.length) {
        return <div className={s.page}>No words on this page</div>;
    }

    return (
        <div className={s.page}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={group}
                onChange={handleChangeGroup}
                className={s.select}
            >
                <MenuItem value={0}>A1</MenuItem>
                <MenuItem value={1}>A2</MenuItem>
                <MenuItem value={2}>B1</MenuItem>
                <MenuItem value={3}>B2</MenuItem>
                <MenuItem value={4}>C1</MenuItem>
                <MenuItem value={5}>C2</MenuItem>
            </Select>
            <Pagination
                count={30}
                size="large"
                onChange={(e, number) => setPage(number - 1)}
                className={s.pagination}
            />
            {
                data?.map((item: IWord, index: number) => (
                        <div className={s.wordBlock} key={`${item.id}list`}>
                            <button
                                type="button"
                                className={s.star_button}
                                onClick={() => {
                                    let newMarked = marked;
                                    marked.includes(item.id)
                                    ? (newMarked = newMarked.filter((mark) => mark !== item.id))
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
                                    console.log('click');
                                    const newArr = deleted;
                                    newArr.push(item.id);
                                    setDeleted(newArr);
                                    forceUpdate();
                                }}
                            >
                                <img src={Basket} alt="Delete" />
                            </button>
                            <div className={s.text_block}>
                                {index + 1}.
                                 <b>{item.word}</b> - [{item.transcription}] - {item.wordTranslate}
                                <button
                                    type="button"
                                    onClick={() => handlePlayAudio(item.audio)}
                                    className={s.word_translation_audio}
                                >
                                    <img src={Sound} alt="PlaySound" />
                                </button>
                            </div>
                            <br />
                            <div className={s.text_block}>
                                <span style={{ marginLeft: '15px' }} dangerouslySetInnerHTML={{ __html: item.textMeaning }} />
                                <button
                                    type="button"
                                    onClick={() => handlePlayAudio(item.audioMeaning)}
                                    className={s.word_translation_audio}
                                >
                                    <img src={Sound} alt="PlaySound" />
                                </button>
                            </div>
                            <br />
                            <div style={{ marginLeft: '15px' }}>{item.textMeaningTranslate}</div>
                            <br />
                            <div className={s.text_block}>
                                <span style={{ marginLeft: '15px' }} dangerouslySetInnerHTML={{ __html: item.textExample }} />
                                <button
                                    type="button"
                                    onClick={() => handlePlayAudio(item.audioExample)}
                                    className={s.word_translation_audio}
                                >
                                    <img src={Sound} alt="PlaySound" />
                                </button>
                            </div>
                            <br />
                            <div style={{ marginLeft: '15px' }}>{item.textExampleTranslate}</div>
                        </div>
                    ))
            }
        </div>
    );
};

export default WordList;
