import { useState } from 'react';
import {MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer, MDBTooltip} from 'mdb-react-ui-kit';
import NoteModal from './NoteModal';
import TodoModal from './TodoModal';

export default function Add({addNote, addTodoList}) {


    const [showAddNote, setShowAddNote] = useState(false)
    const [showAddTodoList, setShowAddTodoList] = useState(false)

    function toggleAddNote() {
        setShowAddNote(!showAddNote)
    }

    function toggleAddTodoList() {
      setShowAddTodoList(!showAddTodoList)
    }

    async function createNote(title, content , color) {
        await addNote({
            title,
            content,
            color
        })
    }

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
        <MDBTooltip tag="span" title={"Add New Note or To Do"}>
          <MDBDropdownToggle color="link" > <MDBIcon fas icon='plus' size='lg' /> </MDBDropdownToggle>
        </MDBTooltip>
        <MDBDropdownMenu>
          <MDBDropdownItem name="note" link onClick={toggleAddNote}> <MDBIcon fas icon="sticky-note" className='mx-1'/> Note</MDBDropdownItem>
          <MDBDropdownItem name="todo" link onClick={toggleAddTodoList}> <MDBIcon fas icon="check-square" className='mx-1' /> ToDo List</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </>
      );
}
