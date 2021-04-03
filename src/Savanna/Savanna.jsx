import React, {useEffect, useState} from 'react';
import './Savanna.scss';



const Savanna = () => {
    const [posY, setPosY] = useState(98);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosY(prevState => {
                if(prevState <= 3) {
                    clearInterval(interval);
                    return 0;
                }
                return prevState - 5;
            });
        }, 2000)
    }, []);

    return (
        <div className="main">
            <div className="image-background"
                style={{backgroundPositionY: `${posY}%`}}></div>
        </div>
    );
};

export default Savanna;
