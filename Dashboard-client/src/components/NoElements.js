
import { MDBBtn, MDBContainer, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';
export default function NoElements({colors, types, removeColor, removeType}) {

    const colorsVar = ['primary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

          return  <>
          { (colors.size === 0 && types.size === 0) ?
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