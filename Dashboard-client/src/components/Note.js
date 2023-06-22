// Importing necessary components from the mdb-react-ui-kit library and the useState hook from React
// Importing the NoteModal, ModalDialog component, useDate hook from their respective files
import { MDBCol, MDBContainer, MDBTypography, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import ModalDialog from "./ModalDialog";
import NoteModal from "./NoteModal";
import { useState } from "react";
import { useDate } from "../hooks/useDate";


// Note component
export default function Note({note, deleteNote, updateNote}) {

    const {title, content, color, createdAt, _id} = note;

    const [showModal, setShowModal] = useState(false);
    const [showUpdateNote, setShowUpdateNote] = useState(false);

    const {dateFormat, toggleDateFormat} = useDate(createdAt);

    // Toggles the delete confirmation modal
    function toggleShowModal() {
        setShowModal(!showModal);
    }

    // Toggle the update note modal
    function toggleUpdateNote() {
        setShowUpdateNote(!showUpdateNote);
    }
    
      return (<>
{/* Update Note Modal */}    
<NoteModal key={note._id} modalTitle="UpdateNote" modalButton="Update Note" showAddNote={showUpdateNote} setShowAddNote={setShowUpdateNote} toggleShowAddNote={toggleUpdateNote} createUpdateNote={updateNote} note={note}/>
{/* Delete Note Modal */}
<ModalDialog title="Delete Note" content={`You are about to delete this note?`} btnLabel="Delete" btnColor="danger" handleClick={()=> {toggleShowModal(); deleteNote(_id);}} showModel={showModal} setShowModal={setShowModal} toggleShow={toggleShowModal}/>  
    <MDBCol lg='4' md='6' sm='12' xs='12'>
        <MDBContainer className={`alert alert-${color}`} role="alert">
            <MDBContainer className="p-0 d-flex">
                <MDBTypography tag="h4" className="alert-heading"><strong>{title}</strong></MDBTypography>
                {/* Edit and Delete Buttons */}
                <span className="ms-auto mb-1" aria-hidden="true">
                <MDBBtn tag='a' color='none' className="mx-3"><MDBIcon fas icon='pencil-alt' onClick={toggleUpdateNote}/></MDBBtn>
                    <MDBBtn tag='a' color='none'><MDBIcon fas icon='trash-alt' onClick={toggleShowModal}/></MDBBtn>
                </span>
            </MDBContainer>
            <MDBTypography>
                {/* implement line break */}
                {content.split('\n').map((line, index) => (
                    <span key={index}>{line}<br/></span>
                ))}
                </MDBTypography>
            <MDBContainer className="text-end">
                <MDBTypography onClick={toggleDateFormat} tag='small'> {dateFormat} </MDBTypography>
            </MDBContainer>
        </MDBContainer>
    </MDBCol>
    </>);
} 


