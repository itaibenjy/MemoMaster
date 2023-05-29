import React, { useState, useEffect } from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';

const Watch = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>{time.toLocaleTimeString([], {hour12: false})}</MDBTypography>
    );
};

export default Watch;
