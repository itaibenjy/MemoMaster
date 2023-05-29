import { useState } from 'react';
import {MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer} from 'mdb-react-ui-kit';
import AddNoteModal from './AddNoteModal';

function handleClick(event) {
    console.log(event.target)
}

export default function Add({}) {

    const [showAddNote, setShowAddNote] = useState(false)

    function toggleAddNote() {
        setShowAddNote(!showAddNote)
    }

    function createNote(title, content , color) {
        console.log("createNote" , title, content, color)
    }


      return (
      <>
      <AddNoteModal showAddNote={showAddNote} setShowAddNote={setShowAddNote} toggleShowAddNote={toggleAddNote} createNote={createNote}/>
      <MDBDropdown dropleft group>
        <MDBDropdownToggle color="link" > <MDBIcon fas icon='plus' size='lg' /> </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem name="note" link onClick={toggleAddNote}> <MDBIcon fas icon="sticky-note" className='mx-1'/> Note</MDBDropdownItem>
          <MDBDropdownItem name="todo" link onClick={handleClick}> <MDBIcon fas icon="check-square" className='mx-1' /> ToDo List</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </>
      );
}
