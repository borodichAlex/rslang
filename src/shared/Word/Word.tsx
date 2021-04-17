import React, { useEffect, useState } from 'react';
import Sound from '../../assets/Sound.png';
import Star from '../../assets/Star.png';
import ActiveStar from '../../assets/ActiveStar.png';
import Basket from '../../assets/Basket.png';
import { urlBaseDataWords } from '../../pages/games/common/GamePage';
import { IWord } from '../../interfaces/IWord';
import s from './Word.module.scss';

interface IListWord {
    item: IWord
    index: number
}

const Word = ({ item, index }: IListWord) => {
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
            <div>
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
    );
};

export default Word;
