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
} from 'mdb-react-ui-kit';
import { useState } from 'react';

export default function App({showAddNote, setShowAddNote, toggleShowAddNote, createNote}) {
  const [details, setDetails] = useState({title: '', content: '', color: 'primary'})

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevDetails => {
      return {
        ...prevDetails,
        [name]: value
      }
    })
  }
  
  const createNewNote = () => {
    createNote({...details})
    setDetails({title: '', content: '', color: 'primary'})
    toggleShowAddNote()
  }

  
  const colors = ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
  return (
    <>
      <MDBModal tabIndex='-1' show={showAddNote} setShow={setShowAddNote}>
        <MDBModalDialog centered>
          <MDBModalContent className='text-center'>
            <MDBModalHeader>
              <MDBModalTitle>Add New Note</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShowAddNote}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer className='mb-4 mt-1'>
                {colors.map((color, index) => {
                  return <MDBRadio
                  btn
                  btnColor={color} 
                  id={color} 
                  name='color' 
                  wrapperTag='span' 
                  label=' ' 
                  wrapperClass='mx-1' 
                  key={index} 
                  onChange={() => setDetails(prevDetails => ({...prevDetails, color: color}))}
                  />
                })}

              </MDBContainer>
              <MDBInput wrapperClass='mb-4' onChange={handleInputChange} value={details.title} name="title" label='Title' />
              <MDBTextArea wrapperClass='mb-4' onChange={handleInputChange} value={details.content} name="content" textarea rows={4} label='Content' /> 
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShowAddNote}>
                Close
              </MDBBtn>
              <MDBBtn onClick={createNewNote} >Create Note</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}