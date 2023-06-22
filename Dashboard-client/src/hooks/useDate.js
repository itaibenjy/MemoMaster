// date fns
import { formatDistanceToNow } from 'date-fns';
// Importing useState and useEffect hooks from React
import { useState, useEffect } from 'react';

// React hook that manages date formatting
export function useDate(dateVar) {

    // setting state for time ago and isTimeAgo
    const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(dateVar), {addSuffix: true}));
    const [isTimeAgo, setIsTimeAgo] = useState(true);

    // format date to be more readable
    const date = new Date(dateVar).toLocaleString("en-UK", {dateStyle: "medium", timeStyle: "short", hour12: false});
    const [dateFormat, setDateFormat] = useState(timeAgo);

    // use effect to update time ago every second to keep it up to date
    useEffect(() => {
        const interval = setInterval(() => {
            updateTimeAgo();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function updateTimeAgo() {
        setTimeAgo(formatDistanceToNow(new Date(dateVar), {addSuffix: true, includeSeconds: true,}));
    }

    // toggle between time ago and date format
    function toggleDateFormat() {
        setIsTimeAgo(!isTimeAgo);
        if(isTimeAgo) {
            setDateFormat(date);
        } else {
            setDateFormat(timeAgo);
        }
    }

    return {dateFormat, toggleDateFormat, date, timeAgo};
}
