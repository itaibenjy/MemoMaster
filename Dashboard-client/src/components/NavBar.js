import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { MDBNavbar, MDBContainer, MDBNavbarItem, MDBNavbarBrand, MDBCollapse, MDBNavbarToggler, MDBNavbarNav, MDBBtn, MDBIcon, MDBSwitch} from 'mdb-react-ui-kit';
import {useThemeContext} from "../hooks/useThemeContext";
import LogoLight from '../assets/images/NavBarLogoLight.png'
import LogoDark from '../assets/images/NavBarLogoDark.png'

function NavBar(){

  const { logout } = useLogout()
  const { user } = useAuthContext()
  const { updateTheme, theme } = useThemeContext()
  
  const [switchValue, setSwitchValue] = useState(false);
  const [showBasic, setShowBasic] = useState(false);

  function handleClick() {
    logout()
  }

  useEffect(() => {
    if (theme === 'dark') {
      setSwitchValue(true)
    }
  },[theme])

  function handleSwitch(event) {
    setSwitchValue(event.target.checked)
    if (switchValue) {
      updateTheme('light')
    } else {
      updateTheme('dark')
    }
  }

 return (
    <MDBNavbar expand='md' sticky className='semi-transparent'>
        <MDBContainer fluid>

        <MDBNavbarBrand tag="div" className="my-0 py-0">
          { theme === 'light' ?
          <img src={LogoLight} alt="Logo" height="30" loading="lazy" />
          :
          <img src={LogoDark} alt="Logo" height="30" loading="lazy" />
          }
        </MDBNavbarBrand>
        
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-sm-0">

          <MDBNavbarItem className='ms-auto'>
            <MDBContainer className='d-flex align-items-center justify-content-start ms-auto mt-1 p-0'>
            </MDBContainer>
          </MDBNavbarItem>

          <MDBNavbarItem className=''>
            <MDBContainer className='d-flex align-items-center justify-content-start ms-auto mt-1 p-0'>
              {user && 
              <MDBBtn rounded size="sm" className="mx-2" onClick={handleClick}><MDBIcon icon="sign-out-alt" className="me-1" />Logout</MDBBtn>}
            </MDBContainer>
          </MDBNavbarItem>

          <MDBNavbarItem className=''>
            <MDBContainer className='d-flex align-items-center justify-content-start mt-2 p-0'>
              <MDBIcon fas icon="sun" className="mx-2" />
              <MDBSwitch checked={switchValue} onChange={handleSwitch} />
              <MDBIcon fas icon="moon" />
            </MDBContainer>
          </MDBNavbarItem>

        </MDBNavbarNav>
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
  );
}

export default NavBar;