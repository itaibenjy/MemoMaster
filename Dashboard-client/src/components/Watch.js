// Importing MDBTypography component from the mdb-react-ui-kit library and the useState, useEffect hooks from React
import React, { useState, useEffect } from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';

// Watch component displays the current time and updates it every second
const Watch = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Interval setup to update the time every second
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>{time.toLocaleTimeString("en-UK", {hour12: false})}</MDBTypography>
    );
};

export default Watch;
