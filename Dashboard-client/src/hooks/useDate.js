// Importing necessary functions and hooks from date-fns and React
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect, useRef } from 'react';

// Custom hook to format a given date into a more readable format and display it as time ago
export function useDate(dateVar) {

    // Setting state for time ago and isTimeAgo
    const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(dateVar), {addSuffix: true}));
    const [isTimeAgo, setIsTimeAgo] = useState(true);

    // Format date to be more readable
    const date = new Date(dateVar).toLocaleString("en-UK", {dateStyle: "medium", timeStyle: "short", hour12: false});
    const [dateFormat, setDateFormat] = useState(timeAgo);

    // Creating refs to store previous values of timeAgo and isTimeAgo
    const timeAgoRef = useRef(timeAgo);
    const isTimeAgoRef = useRef(isTimeAgo);

    // Updating refs when timeAgo and isTimeAgo change
    useEffect(() => {
        timeAgoRef.current = timeAgo;
        isTimeAgoRef.current = isTimeAgo;
    }, [timeAgo, isTimeAgo])

    // Use effect to update time ago every second to keep it up to date
    useEffect(() => {
        const interval = setInterval(() => {
            updateTimeAgo();
        }, 1000);

        // Clearing interval on unmount
        return () => clearInterval(interval);
    }, []);

    // Function to update time ago
    function updateTimeAgo() {
        setTimeAgo(formatDistanceToNow(new Date(dateVar), {addSuffix: true, includeSeconds: true,}));

        // If isTimeAgo is true, set dateFormat to previous value of timeAgo
        if(isTimeAgoRef.current) {
            setDateFormat(timeAgoRef.current);
        }
    }

    // Function to toggle between time ago and date format
    function toggleDateFormat() {
        setIsTimeAgo(!isTimeAgo);

        // If isTimeAgo is true, set dateFormat to date, else set it to timeAgo
        if(isTimeAgo) {
            setDateFormat(date);
        } else {
            setDateFormat(timeAgo);
        }
    }

    // Returning formatted date, toggle function, date and time ago
    return {dateFormat, toggleDateFormat, date, timeAgo};
}
