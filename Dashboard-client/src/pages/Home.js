import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';
// MDB components
import { MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { MDBCard, MDBRow} from 'mdb-react-ui-kit';
import Note from '../components/Note';
import Add from '../components/Add';

// components
import Watch from '../components/Watch';


export default function Home() {

  const {user} = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
      if (!user) {
      navigate("/")
      }}, [user])

  return (
    <MDBContainer className='p-1'>
    <MDBContainer fluid className="d-flex justify-content-center align-items-center mt-4">
      <MDBTypography tag='h1' style={{fontFamily: 'Monomania'}} className='display-1'>  Welcome {user?.username}! </MDBTypography>
    </MDBContainer>
    <MDBContainer fluid className="d-flex justify-content-center align-items-center">
      <Watch />
    </MDBContainer>
    <MDBContainer fluid className="d-flex justify-content-end mt-3 mb-1">
      <Add />
    </MDBContainer>
    <MDBCard fluid style={{ height: '100%', minHeight: '60vh' }} className="p-2">
      <MDBRow className="">
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </MDBRow>
    </MDBCard>
    </MDBContainer>
  )
}