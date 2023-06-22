// Importing necessary components from the mdb-react-ui-kit library and the useState hook from React
import { useState } from 'react';
import {MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer} from 'mdb-react-ui-kit';
// Importing the NoteModal and TodoModal components from their respective files
import NoteModal from './NoteModal';
import TodoModal from './TodoModal';

// The Add component provides a user interface for adding new notes and todo lists
export default function Add({addNote, addTodoList}) {


    const [showAddNote, setShowAddNote] = useState(false)
    const [showAddTodoList, setShowAddTodoList] = useState(false)

    // Toggles the visibility of the note 
    function toggleAddNote() {
        setShowAddNote(!showAddNote)
    }

    // Toggles the visibility of the todo 
    function toggleAddTodoList() {
      setShowAddTodoList(!showAddTodoList)
    }

    // Create new note
    async function createNote(title, content , color) {
        await addNote({
            title,
            content,
            color
        })
    }

    // Create new to do
    async function createTodoList(title, color) {
      await addTodoList({
          title,
          color
      })
    }


      return (
      <>
      <NoteModal key="1" modalTitle="Add New Note" modalButton="Create Note" showAddNote={showAddNote} setShowAddNote={setShowAddNote} toggleShowAddNote={toggleAddNote} createUpdateNote={createNote}/>
      <TodoModal key="2" modalTitle="Add New Todo List" modalButton="Create Todo List" showTodo={showAddTodoList} setShowTodo={setShowAddTodoList} toggleShowTodo={toggleAddTodoList} createUpdateTodo={createTodoList}/>
      <MDBDropdown dropleft group>
        <MDBDropdownToggle color="link" > <MDBIcon fas icon='plus' size='lg' /> </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem name="note" link onClick={toggleAddNote}> <MDBIcon fas icon="sticky-note" className='mx-1'/> Note</MDBDropdownItem>
          <MDBDropdownItem name="todo" link onClick={toggleAddTodoList}> <MDBIcon fas icon="check-square" className='mx-1' /> ToDo List</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </>
      );
}
