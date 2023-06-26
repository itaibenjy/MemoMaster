import React, { useState ,useEffect, useRef } from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBBtn, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { formatDistanceToNow } from 'date-fns';

export default function SelectDateTime({ item, index, setItems, updateItem }) {

    // State variables to hold the selected date and time
    const [date, setDate] = useState(item.dateTime ? dayjs(item.dateTime).format('YYYY-MM-DD') : null);
    const [time, setTime] = useState(item.dateTime ? dayjs(item.dateTime).format('HH:mm:ss') : null);

    // Function to update the date and time of the item
    function updateTime() {
        const newDateTime = dayjs(`${date} ${time}`).toDate();
        const newItem = {...item, dateTime: newDateTime};
        updateItem(newItem);
        setItems(prevItems => {
            return prevItems.map((prevItem, i) => {
                if (i === index) {
                    return {
                        ...prevItem,
                        dateTime: newDateTime
                    }
                }
                return prevItem
            })
        })
    }

    // State variables to hold the time ago, date view, and whether the time has passed
    const [timeAgo, setTimeAgo] = useState(item.dateTime ? formatDistanceToNow(new Date(item.dateTime), {addSuffix: true}) : null);
    const [dateView, setDateView] = useState(item.dateTime ? new Date(item.dateTime).toLocaleString("en-UK", {dateStyle: "medium", timeStyle: "short", hour12: false}) : null);
    const [hasPassed, setHasPassed] = useState(item.dateTime ? new Date(item.dateTime).getTime() < new Date().getTime() : null);

    // Ref to hold the item
    const itemRef = useRef(item)

    // Effect to update the item ref
    useEffect(() => {
        itemRef.current = item;
    }, [item])

    // Effect to check if the time has passed periodically
    useEffect(() => {
        const interval = setInterval(() => {
            checkIfTimePassed();
            if (itemRef.current.dateTime){
                setTimeAgo(formatDistanceToNow(new Date(itemRef.current.dateTime), {addSuffix: true}));
                setDateView(new Date(itemRef.current.dateTime).toLocaleString("en-UK", {dateStyle: "medium", timeStyle: "short", hour12: false}))
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    // Function to check if the time has passed
    function checkIfTimePassed() {
        if (itemRef.current.dateTime) {
            setHasPassed(new Date(itemRef.current.dateTime).getTime() < new Date().getTime());
        }
    }

    // Render the component
    return (
        <div className="text-center ms-auto">
            <MDBDropdown>
                {/* Tooltip to show the time ago and date view */}
                <MDBTooltip tag="span" title={timeAgo ? <> {timeAgo} <br></br> {dateView} </> : "No Time Set!"}>
                    {/* Dropdown toggle to show the calendar icon */}
                    <MDBDropdownToggle tag='div' color='none'><MDBIcon fas icon={hasPassed ? 'calendar-times' : item.dateTime ? 'calendar-check' : 'calendar'} /></MDBDropdownToggle>
                </MDBTooltip>
                {/* Dropdown menu to select the date and time */}
                <MDBDropdownMenu className='p-2'>
                    <div onMouseDown={(e) => e.stopPropagation()}>
                    <DatePicker 
                        className="mb-2" 
                        value={date ? dayjs(date) : null} 
                        onChange={(value) => setDate(value ? value.format('YYYY-MM-DD') : null)
                        } />
                    <TimePicker 
                    className="my-2" 
                    value={time ? dayjs(time, 'HH:mm:ss') : time} 
                    format='HH:mm:ss' 
                    onChange={(value) => setTime(value ? value.format('HH:mm:ss') : null)} />
                    </div>
                    {/* Button to save the selected date and time */}
                    <MDBBtn color='primary' onClick={updateTime}>Save</MDBBtn>
                </MDBDropdownMenu>
            </MDBDropdown>
        </div>
    );
}
