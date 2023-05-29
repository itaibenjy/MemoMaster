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
import Login from "./Login"
import Signup from './Signup';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Authenticate() {
  const [fillActive, setFillActive] = useState('tab1');

  const {user} = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/home")
    }}, [user])
  

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  return (
    <MDBContainer fluid style={{ height: '100vh' }}>
       <MDBRow className="justify-content-center align-items-center" style={{ height: '100vh' }}>
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
