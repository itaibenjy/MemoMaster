
// Importing necessary dependencies
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { MDBNavbar, MDBContainer, MDBNavbarItem, MDBNavbarBrand, MDBCollapse, MDBNavbarToggler, MDBNavbarNav, MDBBtn, MDBIcon, MDBSwitch, MDBTooltip} from 'mdb-react-ui-kit';
import {useThemeContext} from "../hooks/useThemeContext";
import LogoLight from '../assets/images/NavBarLogoLight.png'
import LogoDark from '../assets/images/NavBarLogoDark.png'

// Defining the NavBar component
function NavBar(){

  // Using custom hooks to get the logout function, user object, and theme
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const { updateTheme, theme } = useThemeContext()
  
  // Setting up state for the switch and the navbar toggler
  const [switchValue, setSwitchValue] = useState(false);
  const [showBasic, setShowBasic] = useState(false);

  // Function to handle logout button click
  function handleClick() {
    logout()
  }

  // Effect to set the switch value based on the theme
  useEffect(() => {
    if (theme === 'dark') {
      setSwitchValue(true)
    }
  },[theme])

  // Function to handle switch toggle
  function handleSwitch(event) {
    setSwitchValue(event.target.checked)
    if (switchValue) {
      updateTheme('light')
    } else {
      updateTheme('dark')
    }
  }

  // Rendering the NavBar component
  return (
    <MDBNavbar expand='md' sticky className='semi-transparent'>
        <MDBContainer fluid>

        {/* Rendering the logo based on the theme */}
        <MDBNavbarBrand tag="div" className="my-0 py-0">
          { theme === 'light' ?
          <img src={LogoLight} alt="Logo" height="30" loading="lazy" />
          :
          <img src={LogoDark} alt="Logo" height="30" loading="lazy" />
          }
        </MDBNavbarBrand>
        
        {/* Rendering the navbar toggler */}
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        {/* Rendering the navbar items */}
        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-sm-0">

          {/* Rendering the user profile button */}
          <MDBNavbarItem className='ms-auto'>
            <MDBContainer className='d-flex align-items-center justify-content-start ms-auto mt-1 p-0'>
            </MDBContainer>
          </MDBNavbarItem>

          {/* Rendering the logout button */}
          <MDBNavbarItem className=''>
            <MDBContainer className='d-flex align-items-center justify-content-start ms-auto mt-1 p-0'>
              {user && 
              <MDBBtn rounded size="sm" className="mx-2" onClick={handleClick}><MDBIcon icon="sign-out-alt" className="me-1" />Logout</MDBBtn>}
            </MDBContainer>
          </MDBNavbarItem>

          {/* Rendering the theme switch */}
          <MDBNavbarItem className=''>
            <MDBContainer className='d-flex align-items-center justify-content-start mt-2 p-0'>
              <MDBIcon fas icon="sun" className="mx-2" />
              <MDBTooltip title={theme === "light" ? "Dark Mode" : "Light Mode"} tag='span'>
                <MDBSwitch checked={switchValue} onChange={handleSwitch} />
              </MDBTooltip>
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