import { MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";


export default function Note({title, content, date}) {
      return (
    <MDBCol lg='4' md='6' sm='6' xs='12'>
        <MDBContainer className="alert alert-success" role="alert">
            <MDBTypography tag="h4" className="alert-heading"><strong>Note Title </strong></MDBTypography>
            <MDBTypography>Cupidatat velit ullamco deserunt proident nostrud dolor esse. Sit et laborum et aute anim nostrud sit culpa nisi occaecat consequat ipsum sint esse. Eu esse eiusmod reprehenderit incididunt id. Aliqua irure id aute nisi veniam exercitation et. Occaecat ullamco deserunt excepteur proident esse laborum adipisicing nulla commodo qui aliqua non.</MDBTypography>
            <MDBContainer className="text-end">
                <MDBTypography tag='small'> Date </MDBTypography>
            </MDBContainer>
        </MDBContainer>
    </MDBCol>
    );
} 




        // <MDBContainer className="toast show bg-warning" aria-live="assertive">
        //         <div class="toast-header bg-warning text-white">
        //           <i class="fas fa-exclamation-triangle fa-lg me-2"></i>
        //           <strong class="me-auto">MDBootstrap</strong>
        //           <small>11 mins ago</small>
        //           <button type="button" class="btn-close btn-close-white" data-mdb-dismiss="toast" aria-label="Close"></button>
        //         </div>
        //         <div class="toast-body">
        //           Proident cillum anim incididunt anim dolor nostrud labore commodo fugiat velit mollit sint laborum. Dolore est ut labore enim exercitation proident. Magna aliquip exercitation ut ullamco fugiat reprehenderit amet in commodo.
        //         </div>
        //       </MDBContainer>