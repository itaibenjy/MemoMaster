// Importing necessary modules from react and mdb-react-ui-kit libraries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
} from 'mdb-react-ui-kit';

// Importing Login and Signup components and useAuthContext hook
import Login from "../components/Login"
import Signup from '../components/Signup';
import { useAuthContext } from '../hooks/useAuthContext';

// Defining the Authenticate component
export default function Authenticate() {
  // Setting up state for active tab
  const [fillActive, setFillActive] = useState('tab1');

  // Getting user and navigate function from useAuthContext and react-router-dom respectively
  const {user} = useAuthContext()
  const navigate = useNavigate()

  // Redirecting to home page if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/home")
    }}, [user])
  
  // Handling click on tab
  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  // Rendering the component
  return (
    <MDBContainer fluid >
       <MDBRow className="justify-content-center align-items-center" style={{ height: '95vh' }}>
        <MDBCol  xl='3' lg='4' md='6' sm='8' className="text-center">
        <MDBCard className='mb-10' shadow="5">
            <MDBTabs fill className='m-3'>
                <MDBTabsItem>
                <MDBTabsLink onClick={() => handleFillClick('tab1')} active={fillActive === 'tab1'}>
                    Login
                </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
                    Signup
                </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent className='m-3'>
                <MDBTabsPane show={fillActive === 'tab1'}><Login /></MDBTabsPane>
                <MDBTabsPane show={fillActive === 'tab2'}><Signup /></MDBTabsPane>
            </MDBTabsContent>
        </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
