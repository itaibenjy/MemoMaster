// Importing necessary components from the mdb-react-ui-kit library
import { MDBBtn, MDBContainer, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';

// Defining the NoElements component which takes in colors, types, removeColor, and removeType as props
export default function NoElements({colors, types, removeColor, removeType}) {

    // Defining an array of available colors
    const colorsVar = ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

    // Returning a fragment containing either a message indicating that there are no notes or to-do lists yet, or a message indicating that there are no notes or to-do lists that match the current filters
    return  <>
          { (colors.size === 0 && types.size === 0) ? // If there are no colors or types selected
          <MDBContainer className='text-center'>
          <MDBTypography tag='h6' style={{fontFamily: 'Monomania'}} className='display-6 text-center'>
              No Notes or To Do Lists yet! <br/>
              Click the <MDBIcon fas icon="plus" /> button to add some! <MDBIcon far icon="smile-beam" />
          </MDBTypography>
          </MDBContainer>
         :
          <MDBContainer className='text-center'>
            <MDBTypography style={{fontFamily: 'Monomania'}} tag='h6' className='display-6 text-center'>
                No Notes or To Do Lists match the current filters!
            </MDBTypography>
            <MDBBtn color="danger" rounded className="mt-2 mx-auto"onClick={() => {colorsVar.map((color) => removeColor(color)); removeType("note"); removeType("todo")}}>Clear Filters</MDBBtn>
          </MDBContainer>
         }
         </>

}