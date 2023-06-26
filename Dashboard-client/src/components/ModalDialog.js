// Importing necessary modules from the 'mdb-react-ui-kit' package 
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

// Defining a functional component 'ModalDialog' that takes in props
export default function ModalDialog({title, content, btnLabel, btnColor, handleClick, showModel, setShowModal, toggleShow}) {

  // Returning the JSX code for the modal dialog
  return (
    <>
      <MDBModal show={showModel} setShow={setShowModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{content}</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn color={btnColor} onClick={handleClick}>{btnLabel}</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}