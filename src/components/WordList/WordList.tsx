/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { IWordObject } from '../../interfaces';
import getData from '../../utils/getData';
import s from './WordList.module.scss';
import Sound from '../../assets/Sound.png';

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
                        {index + 1}. {item.word} - [{item.transcription}] - {item.wordTranslate}
                        <br /> <br />
                        <div style={{ marginLeft: '15px' }} dangerouslySetInnerHTML={{ __html: item.textMeaning }} />
                        <br />
                        <div style={{ marginLeft: '15px' }}>{item.textMeaningTranslate}</div>
                        <br />
                        <div style={{ marginLeft: '15px' }} dangerouslySetInnerHTML={{ __html: item.textExample }} />
                        <br />
                        <div style={{ marginLeft: '15px' }}>{item.textExampleTranslate}</div>
                    </div>))
                }
            </div>
        </div>
    );
};

export default WordList;
