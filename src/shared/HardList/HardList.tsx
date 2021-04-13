/* eslint-disable react/no-danger */
import React, { useEffect, useReducer, useState } from 'react';
import Sound from '../../assets/Sound.png';
import ActiveStar from '../../assets/ActiveStar.png';
import { urlBaseDataWords } from '../../pages/games/common/GamePage';
import { IWord } from '../../interfaces/IWord';
import s from './HardList.module.scss';
import getWords from '../../helpers/getWords';

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
                            <div className={s.text_block}>
                                {index + 1}.
                                <b>{item.word}</b> - [{item.transcription}]
                                <div
                                    className={JSON.parse(localStorage.getItem('showTranslation') || 'true')
                                        ? s.text
                                        : s.hidden}
                                >
                                    {` - ${item.wordTranslate}`}
                                </div>
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
                                <span style={{ marginLeft: '15px', marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: item.textMeaning }} />
                                <button
                                    type="button"
                                    onClick={() => handlePlayAudio(item.audioMeaning)}
                                    className={s.word_translation_audio}
                                >
                                    <img src={Sound} alt="PlaySound" style={{ marginBottom: '15px' }} />
                                </button>
                            </div>
                            <div
                                style={{ marginLeft: '15px', marginBottom: '15px' }}
                                className={JSON.parse(localStorage.getItem('showTranslation') || 'true')
                                    ? s.text
                                    : s.hidden}
                            >
                                {item.textMeaningTranslate}
                            </div>
                            <div className={s.text_block}>
                                <span style={{ marginLeft: '15px', marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: item.textExample }} />
                                <button
                                    type="button"
                                    onClick={() => handlePlayAudio(item.audioExample)}
                                    className={s.word_translation_audio}
                                >
                                    <img src={Sound} alt="PlaySound" style={{ marginBottom: '15px' }} />
                                </button>
                            </div>
                            <div
                                style={{ marginLeft: '15px' }}
                                className={JSON.parse(localStorage.getItem('showTranslation') || 'true')
                                    ? s.text
                                    : s.hidden}
                            >
                                {item.textExampleTranslate}
                            </div>
                        </div>
                    ))
                ) : <div>No words on this page</div>
            }
        </div>
    );
};

export default HardList;
