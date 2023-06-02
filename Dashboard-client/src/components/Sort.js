import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBRadio} from 'mdb-react-ui-kit';


export default function Sort({reversed, setReversed}) {

    return (
        <MDBDropdown group>
            <MDBDropdownToggle color="link">Sort</MDBDropdownToggle>
            <MDBDropdownMenu className='p-4 text-muted' style={{ maxWidth: '200px' }}>
                <MDBRadio name='date' id='date1' label='New to old' checked={!reversed} onChange={() => {setReversed(false); console.log(reversed)}}/>  
                <MDBRadio name='date' id='date2' label='Old to new' checked={reversed} onChange={() => {setReversed(true); console.log(reversed)}}/>
            </MDBDropdownMenu>
        </MDBDropdown>
    )
}