// Importing necessary components from the mdb-react-ui-kit library and the useState hook from React
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBTextArea,
  MDBRadio,
  MDBContainer,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import { useState } from 'react';

// Defining the App component that takes in props
export default function NoteModal({showAddNote, setShowAddNote, toggleShowAddNote, createUpdateNote, modalTitle, modalButton, note}) {

  // Initializing the state of the component with an object containing the details of the note
  const [details, setDetails] = useState({title: note ? note.title : '', content: note ? note.content : '', color: note ? note.color : 'primary'})

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevDetails => {
      return {
        ...prevDetails,
        [name]: value
      }
    })
  }
  
  // Function to create a new note
  async function createUpdateNewNote() {
    if (note) {
      await createUpdateNote(note._id, details)
    }
    else {
      createUpdateNote(details.title, details.content, details.color)
      setDetails({title: '', content: '', color: 'primary'})
    }
    toggleShowAddNote()
  }

  // Array of colors to choose from
  const colors = ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

  // Rendering the modal component with the form to add a new note
  return (
    <>
      <MDBModal tabIndex='-1' show={showAddNote} setShow={setShowAddNote}>
        <MDBModalDialog centered>
          <MDBModalContent className='text-center'>
            <MDBModalHeader>
              <MDBModalTitle>{modalTitle}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShowAddNote}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer className='mb-4 mt-1'>
                {/* Mapping over the colors array to render radio buttons for each color */}
                {colors.map((color, index) => {
                  return <MDBRadio
                  btn
                  btnColor={color} 
                  id={note ? color+ note._id : color} 
                  name={note ? "color"+ note._id : "color"}
                  wrapperTag='span' 
                  label=' ' 
                  wrapperClass='mx-1' 
                  key={note ? note._id + index : index}
                  onChange={() => setDetails(prevDetails => ({...prevDetails, color: color}))}
                  />
                })}

              </MDBContainer>
              {/* Input field for the note title */}
              <MDBInput wrapperClass='mb-4' onChange={handleInputChange} value={details.title} name="title" label='Title' tabIndex={1} />
              {/* Textarea field for the note content */}
              <MDBTextArea wrapperClass='mb-4' onChange={handleInputChange} value={details.content} name="content" rows={4} label='Content' tabIndex={2} /> 
            </MDBModalBody>
            <MDBModalFooter>
              {/* Button to close the modal */}
              <MDBBtn color='secondary' onClick={toggleShowAddNote}>
                Close
              </MDBBtn>
              {/* Button to create a new note */}
              <MDBBtn onClick={createUpdateNewNote} >{modalButton}</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}