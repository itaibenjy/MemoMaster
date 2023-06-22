// Importing necessary components from the mdb-react-ui-kit library
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody, MDBSpinner } from 'mdb-react-ui-kit';

// The Loading component renders a modal dialog with a spinner, indicating that the content is loading
function Loading() {
    return (
        <MDBModal tabIndex="-1" staticBackdrop show>
            <MDBModalDialog centered className="modal-dialog-centered d-flex align-items-center justify-content-center">
                <MDBSpinner className='me-2' color="primary" style={{ width: '5rem', height: '5rem'}}>
                <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default Loading;
