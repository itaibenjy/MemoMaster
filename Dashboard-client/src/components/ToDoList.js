
import { MDBCol, MDBContainer, MDBTypography, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import NoteModal from "./NoteModal";
import { useState } from "react";
import { MDBInputGroup, MDBCheckbox } from "mdb-react-ui-kit";
import { useDate } from "../hooks/useDate";



export default function ToDoList({color}) {

    //const {title, childText, color, createdAt, _id} = toDoList;
    //for testing
    const title = "This is a long title";
    const childText = [{content: "test1"}, {content: "test2"}];
    const createdAt = "2021-08-01T00:00:00.000Z";

    const [showModal, setShowModal] = useState(false);
    const [showUpdateNote, setShowUpdateNote] = useState(false);

    const [input, setInput] = useState('');

    const {dateFormat, toggleDateFormat} = useDate(createdAt);

    function toggleShowModal() {
        setShowModal(!showModal);
    }

    function toggleUpdateNote() {
        setShowUpdateNote(!showUpdateNote);
    }
    
      return (<>
    <MDBCol lg='4' md='6' sm='12' xs='12'>
        <MDBContainer className={`alert alert-${color}`} role="alert">
            <MDBContainer className="p-0 d-flex text-center">
                <MDBTypography tag="h4" className="ms-auto alert-heading text-center"><strong>{title}</strong></MDBTypography>
                <span className="ms-auto mb-1" aria-hidden="true">
                    <MDBBtn tag='a' color='none' className="ms-2"><MDBIcon fas icon='pencil-alt' onClick={toggleUpdateNote}/></MDBBtn>
                    <MDBBtn tag='a' color='none'className="ms-3"><MDBIcon fas icon='trash-alt' onClick={toggleShowModal}/></MDBBtn>
                </span>
            </MDBContainer>
            <MDBContainer className="d-flex justify-content-center">
                 <MDBInputGroup className='mb-3'>
                    <input type='text' className={`custom-input form-control ${color}`} value={input} onChange={(e) => setInput(e.target.value)} />
                    <MDBBtn color={color=="dark" ? "light" : color=="light" ? "dark" : color} outline><MDBIcon fas icon="plus" /></MDBBtn>
                </MDBInputGroup>
            </MDBContainer>

            <hr/>

            <MDBContainer className="px-5">
                {childText.map((child, index) => (
                    <MDBCheckbox className={`custom-check-input ${color}`} color={color} key={index} label={child.content} />
                ))}
            </MDBContainer>

            <MDBContainer className="text-end">
                <MDBTypography onClick={toggleDateFormat} tag='small'> {dateFormat} </MDBTypography>
            </MDBContainer>
        </MDBContainer>
    </MDBCol>
    </>);
} 