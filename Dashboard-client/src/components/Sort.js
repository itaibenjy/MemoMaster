// Importing necessary components from the mdb-react-ui-kit library
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBRadio} from 'mdb-react-ui-kit';

// Defining a functional component named Sort that takes in two props: reversed and setReversed
export default function Sort({reversed, setReversed}) {

    // The component returns a dropdown menu with two radio buttons for sorting data
    return (
        <MDBDropdown group>
            <MDBDropdownToggle color="link">Sort</MDBDropdownToggle>
            <MDBDropdownMenu className='p-4 text-muted' style={{ maxWidth: '200px' }}>
                <MDBRadio name='date' id='date1' label='New to old' checked={!reversed} onChange={() => setReversed(false)}/>  
                <MDBRadio name='date' id='date2' label='Old to new' checked={reversed} onChange={() => setReversed(true)}/>
            </MDBDropdownMenu>
        </MDBDropdown>
    )
}