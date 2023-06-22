
import { MDBBtn, MDBContainer, MDBTypography } from 'mdb-react-ui-kit'
import NotFoundGif from '../assets/images/NotFound.gif'

export default function NotFound() {
    return (
        <MDBContainer className="d-flex align-items-center flex-column pt-5 " style={{ height: "calc(100vh - 50px)" }}>
            <MDBTypography className="text-center display-1" style={{fontFamily: 'Monomania'}}>Page Not Found</MDBTypography>
            <img src={NotFoundGif} alt="Not Found" />
            <MDBBtn href="/home" className="mt-5">Home page</MDBBtn>
        </MDBContainer>
    )
}