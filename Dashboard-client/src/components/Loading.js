// Importing necessary components from the mdb-react-ui-kit library
import { MDBModal, MDBModalDialog, MDBSpinner } from 'mdb-react-ui-kit';

// Defining a functional component called Loading
function Loading() {
    // Returning a modal with a spinner to indicate that the page is loading
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

// Exporting the Loading component as the default export of this module
export default Loading;
