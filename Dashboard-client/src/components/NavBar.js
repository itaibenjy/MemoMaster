import { useState } from "react";
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { MDBNavbar, MDBContainer, MDBNavbarBrand, MDBBtn, MDBIcon, MDBSwitch} from 'mdb-react-ui-kit';
import {useThemeContext} from "../hooks/useThemeContext";

function NavBar(){

  const { logout } = useLogout()
  const { user } = useAuthContext()
  const { setTheme } = useThemeContext()
  
  const [switchValue, setSwitchValue] = useState(false);

  function handleClick() {
    logout()
  }

  function handleSwitch(event) {
    setSwitchValue(event.target.checked)
    if (switchValue) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

 return (
    <MDBNavbar sticky className="m-0">
      <MDBContainer fluid className="flex-nowrap">
        <MDBNavbarBrand><i className="far fa-calendar-check fa-xl"></i></MDBNavbarBrand>
        <MDBContainer className='d-flex align-items-center justify-content-end m-0'>
          {user && 
          <MDBBtn rounded size="sm" className="mx-2" onClick={handleClick}>Logout</MDBBtn>}
          <MDBIcon fas icon="sun" className="mx-2" /><MDBSwitch checked={switchValue} onChange={handleSwitch} /><MDBIcon fas icon="moon" />
        </MDBContainer>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavBar;