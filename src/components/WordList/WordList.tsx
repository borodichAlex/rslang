/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { IWordObject } from '../../interfaces';
import getData from '../../utils/getData';
import s from './WordList.module.scss';
import Sound from '../../assets/Sound.png';
import Star from '../../assets/Star.png';
import ActiveStar from '../../assets/ActiveStar.png';
import Basket from '../../assets/Basket.png';

type TGroup = 0 | 1 | 2 | 3 | 4 | 5;

const WordList = () => {
    const [group, setGroup] = useState<TGroup>(0);
    const [page, setPage] = useState(0);
    const [data, setData] = useState<IWordObject[] | []>([]);

    useEffect(() => {
        getData(`https://react-learnwords-example.herokuapp.com/words?group=${group}&page=${page}`)
            .then((res) => {
                setData(res);
                console.log(res);
            });
    }, [group, page]);

    if (!data.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className={s.root}>
            <div className={s.page}>
                {
                    data?.map((item: IWordObject, index: number) => (
                    <div className={s.wordBlock} key={`${index}${item.word}list`}>
                        <button
                            type="button"
                            className={s.star_button}
                        >
                             <img src={true ? ActiveStar : Star} alt={true ? 'saved' : 'Save'} />        {/* условие, проверяющее наличие слова в сохранённых */}
                        </button>
                        <button
                            type="button"
                            className={s.basket_button}
                        >
                            <img src={Basket} alt="Delete" />
                        </button>
                        <div className={s.text_block}>
                            {index + 1}. {item.word} - [{item.transcription}] - {item.wordTranslate}
                            <button
                                type="button"
                                onClick={() => console.log('playSound(item.sound)')}
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
                                    onClick={() => console.log('playSound(item.sound)')}
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
                                    onClick={() => console.log('playSound(item.sound)')}
                                    className={s.word_translation_audio}
                            >
                                    <img src={Sound} alt="PlaySound" />
                            </button>
                        </div>
                        <br />
                        <div style={{ marginLeft: '15px' }}>{item.textExampleTranslate}</div>
                    </div>))
                }
            </div>
        </div>
    );
};

export default WordList;
