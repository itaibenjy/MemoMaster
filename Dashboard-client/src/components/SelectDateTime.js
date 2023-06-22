import React, { useState ,useEffect, useRef } from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBBtn, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { formatDistanceToNow } from 'date-fns';

export default function SelectDateTime({ item, index, setItems, updateItem }) {

    const [date, setDate] = useState(item.dateTime ? dayjs(item.dateTime).format('YYYY-MM-DD') : null);
    const [time, setTime] = useState(item.dateTime ? dayjs(item.dateTime).format('HH:mm:ss') : null);

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


    const [timeAgo, setTimeAgo] = useState(item.dateTime ? formatDistanceToNow(new Date(item.dateTime), {addSuffix: true}) : null);
    const [dateView, setDateView] = useState(item.dateTime ? new Date(item.dateTime).toLocaleString("en-UK", {dateStyle: "medium", timeStyle: "short", hour12: false}) : null);

    const [hasPassed, setHasPassed] = useState(item.dateTime ? new Date(item.dateTime).getTime() < new Date().getTime() : null);
    const itemRef = useRef(item)

    useEffect(() => {
        itemRef.current = item;
    }, [item])

    // check if time has passed periodically
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


    function checkIfTimePassed() {
        if (itemRef.current.dateTime) {
            setHasPassed(new Date(itemRef.current.dateTime).getTime() < new Date().getTime());
        }
    }


    return (
        <div className="text-center ms-auto">
            <MDBDropdown>
                <MDBTooltip tag="a" title={timeAgo ? <> {timeAgo} <br></br> {dateView} </> : "No Time Set!"}>
                    <MDBDropdownToggle tag='div' color='none'><MDBIcon fas icon={hasPassed ? 'calendar-times' : item.dateTime ? 'calendar-check' : 'calendar'} /></MDBDropdownToggle>
                </MDBTooltip>
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
                    <MDBBtn color='primary' onClick={updateTime}>Save</MDBBtn>
                </MDBDropdownMenu>
            </MDBDropdown>
        </div>
    );
}
