// Importing necessary components from the mdb-react-ui-kit library
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBRadio} from 'mdb-react-ui-kit';

// Sort component
export default function Sort({reversed, setReversed}) {

    return (
        <MDBDropdown group>
            {/* Dropdown toggle */}
            <MDBDropdownToggle color="link">Sort</MDBDropdownToggle>
            <MDBDropdownMenu className='p-4 text-muted' style={{ maxWidth: '200px' }}>
                {/* Radio button for sorting by new to old */}
                <MDBRadio name='date' id='date1' label='New to old' checked={!reversed} onChange={() => setReversed(false)}/>
                {/* Radio button for sorting by old to new */} 
                <MDBRadio name='date' id='date2' label='Old to new' checked={reversed} onChange={() => setReversed(true)}/>
            </MDBDropdownMenu>
        </MDBDropdown>
    )
}