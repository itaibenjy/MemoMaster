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
  MDBTypography,
} from 'mdb-react-ui-kit';

// Importing Login and Signup components and useAuthContext hook
import Login from "../components/Login"
import Signup from '../components/Signup';
import { useAuthContext } from '../hooks/useAuthContext';
import { useThemeContext } from '../hooks/useThemeContext';
import LogoLight from '../assets/images/NavBarLogoLight.png'
import LogoDark from '../assets/images/NavBarLogoDark.png'

// Defining the Authenticate component
export default function Authenticate() {
  // Setting up state for active tab
  const [fillActive, setFillActive] = useState('tab1');

  // Getting user and navigate function from useAuthContext and react-router-dom respectively
  const {user} = useAuthContext()
  const {theme} = useThemeContext()
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
  //style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 80px)' }}
  return (<>
  <MDBContainer className='containter col-xxxl-8 px-4 py-1' style={{marginTop: "10%", marginBottom: "10%"}}>
      <MDBContainer className="row align-items-center g-lg-5 p-5">
        <MDBContainer className="col-lg-7 text-center text-lg-start">
          { theme === 'light' ?
          <img src={LogoLight} alt="Logo" width="80%" loading="lazy" />
          :
          <img src={LogoDark} alt="Logo" width="80%" loading="lazy" />
          }
          <MDBTypography tag='h6' style={{fontFamily: 'Monomania'}} variant='h6' className="my-2 display-6">Master Your Tasks, Manage Your Memories! </MDBTypography>
          <MDBTypography className="col-lg-10 fs-4">
            Welcome to MemoMaster - your hub for notes and tasks. Seamlessly organize your thoughts and manage to-do lists in one intuitive platform. Embrace enhanced productivity and transform your everyday routine. Dive into the MemoMaster experience today!
          </MDBTypography>
        </MDBContainer>
        <MDBContainer className="col-md-10 mx-auto col-lg-5">
          <MDBCard className='p-4' shadow="5" style={{borderRadius:"15px"}}>
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
        </MDBContainer>
      </MDBContainer>
    </MDBContainer>
  </>);
}
