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
export default function NoteModal({showTodo, setShowTodo, toggleShowTodo, createUpdateTodo, modalTitle, modalButton, todo}) {

  // Initializing the state of the component with an object containing the details of the todo
  const [details, setDetails] = useState({title: todo ? todo.title : '', color: todo ? todo.color : 'primary'})

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
  
  // Function to create a new todo
  function createUpdateNewTodo() {
    if (todo) {
      createUpdateTodo(todo._id, details)
    }
    else {
      createUpdateTodo(details.title, details.color)
      setDetails({title: '', color: 'primary'})
    }
    toggleShowTodo()
  }

  // Array of colors to choose from
  const colors = ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

  // Rendering the modal component with the form to add a new todo
  return (
    <>
      <MDBModal tabIndex='-1' show={showTodo} setShow={setShowTodo}>
        <MDBModalDialog centered>
          <MDBModalContent className='text-center'>
            <MDBModalHeader>
              <MDBModalTitle>{modalTitle}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShowTodo}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer className='mb-4 mt-1'>
                {/* Mapping over the colors array to render radio buttons for each color */}
                {colors.map((color, index) => {
                  return <MDBRadio
                  btn
                  btnColor={color} 
                  id={todo ? color+ todo._id : color + "Todo"} 
                  name={todo ? "color"+ todo._id : "colorTodo"}
                  wrapperTag='span' 
                  label=' ' 
                  wrapperClass='mx-1' 
                  key={todo ? todo._id + index : index}
                  onChange={() => setDetails(prevDetails => ({...prevDetails, color: color}))}
                  />
                })}

              </MDBContainer>
              {/* Input field for the todo title */}
              <MDBInput wrapperClass='mb-4' onChange={handleInputChange} value={details.title} name="title" label='Title' tabIndex={1} />
            </MDBModalBody>
            <MDBModalFooter>
              {/* Button to close the modal */}
              <MDBBtn color='secondary' onClick={toggleShowTodo}>
                Close
              </MDBBtn>
              {/* Button to create a new todo */}
              <MDBBtn onClick={createUpdateNewTodo} >{modalButton}</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}