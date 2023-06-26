// Importing necessary components and hooks from external libraries and files
import { MDBCol, MDBContainer, MDBTypography, MDBBtn, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import ModalDialog from "./ModalDialog";
import NoteModal from "./NoteModal";
import { useState } from "react";
import { useDate } from "../hooks/useDate";

// Defining the Note component which takes in a note object, deleteNote function and updateNote function as props
export default function Note({note, deleteNote, updateNote}) {

    // Destructuring the note object to get its properties
    const {title, content, color, createdAt, _id} = note;

    // Defining state variables to control the visibility of the modal dialogs
    const [showModal, setShowModal] = useState(false);
    const [showUpdateNote, setShowUpdateNote] = useState(false);

    // Using the useDate hook to get the formatted date and time ago string
    const {dateFormat, toggleDateFormat,  date, timeAgo} = useDate(createdAt);

    // Function to toggle the visibility of the delete confirmation modal dialog
    function toggleShowModal() {
        setShowModal(!showModal);
    }

    // Function to toggle the visibility of the update note modal dialog
    function toggleUpdateNote() {
        setShowUpdateNote(!showUpdateNote);
    }
    
    // Rendering the Note component
    return (<>
        {/* Rendering the update note modal dialog */}
        <NoteModal key={note._id} modalTitle="UpdateNote" modalButton="Update Note" showAddNote={showUpdateNote} setShowAddNote={setShowUpdateNote} toggleShowAddNote={toggleUpdateNote} createUpdateNote={updateNote} note={note}/>
        {/* Rendering the delete confirmation modal dialog */}
        <ModalDialog title="Delete Note" content={`You are about to delete this note?`} btnLabel="Delete" btnColor="danger" handleClick={()=> {toggleShowModal(); deleteNote(_id);}} showModel={showModal} setShowModal={setShowModal} toggleShow={toggleShowModal}/>  
        {/* Rendering the note card */}
        <MDBCol lg='4' md='6' sm='12' xs='12'>
            <MDBContainer className={`alert alert-${color}`} role="alert">
                <MDBContainer className="p-0 d-flex">
                    {/* Rendering the note title */}
                    <MDBTypography tag="h4" className="alert-heading"><strong>{title}</strong></MDBTypography>
                    {/* Rendering the edit and delete buttons */}
                    <span className="ms-auto mb-1" aria-hidden="true">
                        <MDBTooltip tag="span" title={"Edit Note"}>
                            <MDBBtn tag='a' color='none' className="mx-3"><MDBIcon fas icon='pencil-alt' onClick={toggleUpdateNote}/></MDBBtn>
                        </MDBTooltip>
                        <MDBTooltip tag="span" title={"Delete Note"}>
                            <MDBBtn tag='a' color='none'><MDBIcon fas icon='trash-alt' onClick={toggleShowModal}/></MDBBtn>
                        </MDBTooltip>
                    </span>
                </MDBContainer>
                {/* Rendering the note content */}
                <MDBTypography>
                    {/* Implementing line breaks for the note content */}
                    {content.split('\n').map((line, index) => (
                        <span key={index}>{line}<br/></span>
                    ))}
                </MDBTypography>
                {/* Rendering the date and time ago string */}
                <MDBContainer className="text-end">
                    <MDBTooltip placement='bottom' tag="span" title={<> {timeAgo} <br></br> {date} </>}>
                        <MDBTypography onClick={toggleDateFormat} tag='small'> {dateFormat} </MDBTypography>
                    </MDBTooltip>
                </MDBContainer>
            </MDBContainer>
        </MDBCol>
    </>);
}
