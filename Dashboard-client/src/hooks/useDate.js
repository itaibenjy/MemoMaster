// date fns
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect, useRef } from 'react';


export function useDate(dateVar) {

    // setting state for time ago and isTimeAgo
    const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(dateVar), {addSuffix: true}));
    const [isTimeAgo, setIsTimeAgo] = useState(true);

    // format date to be more readable
    const date = new Date(dateVar).toLocaleString("en-UK", {dateStyle: "medium", timeStyle: "short", hour12: false});
    const [dateFormat, setDateFormat] = useState(timeAgo);
    const timeAgoRef = useRef(timeAgo);
    const isTimeAgoRef = useRef(isTimeAgo);

    useEffect(() => {
        timeAgoRef.current = timeAgo;
        isTimeAgoRef.current = isTimeAgo;
    }, [timeAgo, isTimeAgo])


    // use effect to update time ago every second to keep it up to date
    useEffect(() => {
        const interval = setInterval(() => {
            updateTimeAgo();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function updateTimeAgo() {
        setTimeAgo(formatDistanceToNow(new Date(dateVar), {addSuffix: true, includeSeconds: true,}));
        if(isTimeAgoRef.current) {
            setDateFormat(timeAgoRef.current);
        }
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
