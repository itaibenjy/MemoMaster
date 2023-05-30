import { MDBCol, MDBContainer, MDBTypography, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import ModalDialog from "./ModalDialog";
import NoteModal from "./NoteModal";
import { useState } from "react";


export default function Note({note, deleteNote, updateNote}) {

    const {title, content, color, createdAt, _id} = note;
    const date = new Date(createdAt).toLocaleDateString();

    const [showModal, setShowModal] = useState(false);
    const [showUpdateNote, setShowUpdateNote] = useState(false);

    function toggleShowModal() {
        setShowModal(!showModal);
    }

    function toggleUpdateNote() {
        setShowUpdateNote(!showUpdateNote);
    }
    
      return (<>
<NoteModal key={note._id} modalTitle="UpdateNote" modalButton="Update Note" showAddNote={showUpdateNote} setShowAddNote={setShowUpdateNote} toggleShowAddNote={toggleUpdateNote} createUpdateNote={updateNote} note={note}/>
<ModalDialog title="Delete Note" content={`You are about to delete this note?`} btnLabel="Delete" btnColor="danger" handleClick={()=>deleteNote(_id)} showModel={showModal} setShowModal={setShowModal} toggleShow={toggleShowModal}/>  
    <MDBCol lg='4' md='6' sm='6' xs='12'>
        <MDBContainer className={`alert alert-${color}`} role="alert">
            <MDBContainer className="p-0 d-flex">
                <MDBTypography tag="h4" className="alert-heading"><strong>{title}</strong></MDBTypography>
                <span className="ms-auto mb-1" aria-hidden="true">
                <MDBBtn tag='a' color='none' className="mx-3"><MDBIcon fas icon='pencil-alt' onClick={toggleUpdateNote}/></MDBBtn>
                    <MDBBtn tag='a' color='none'><MDBIcon fas icon='trash-alt' onClick={toggleShowModal}/></MDBBtn>
                </span>
            </MDBContainer>
            <MDBTypography>{content}</MDBTypography>
            <MDBContainer className="text-end">
                <MDBTypography tag='small'> {date} </MDBTypography>
            </MDBContainer>
        </MDBContainer>
    </MDBCol>
    </>);
} 


