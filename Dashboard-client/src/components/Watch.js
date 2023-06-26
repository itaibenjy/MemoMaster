// Importing necessary modules
import React, { useState, useEffect } from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';

// Defining a functional component called Watch
const Watch = () => {
    // Initializing a state variable called time using the useState hook
    const [time, setTime] = useState(new Date());

    // Using the useEffect hook to update the time state variable every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        // Clearing the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    // Rendering the time in a typography component
    return (
        <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>{time.toLocaleTimeString("en-UK", {hour12: false})}</MDBTypography>
    );
};

// Exporting the Watch component as the default export
export default Watch;
