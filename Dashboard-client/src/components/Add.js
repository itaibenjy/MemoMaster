import React, { useState } from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBTooltip, MDBIcon } from 'mdb-react-ui-kit';
import NoteModal from './NoteModal';
import TodoModal from './TodoModal';

function Add({ addNote, addTodoList }) {
  // Define state variables for showing/hiding the note and todo modals
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddTodoList, setShowAddTodoList] = useState(false);

  // Define functions for toggling the note and todo modals
  function toggleAddNote() {
    setShowAddNote(!showAddNote);
  }

  function toggleAddTodoList() {
    setShowAddTodoList(!showAddTodoList);
  }

  // Define functions for creating new notes and todo lists
  async function createNote(title, content, color) {
    await addNote({
      title,
      content,
      color
    });
  }

  async function createTodoList(title, color) {
    await addTodoList({
      title,
      color
    });
  }

  // Render the component
  return (
    <>
      {/* Render the note modal */}
      <NoteModal key="1" modalTitle="Add New Note" modalButton="Create Note" showAddNote={showAddNote} setShowAddNote={setShowAddNote} toggleShowAddNote={toggleAddNote} createUpdateNote={createNote} />

      {/* Render the todo modal */}
      <TodoModal key="2" modalTitle="Add New Todo List" modalButton="Create Todo List" showTodo={showAddTodoList} setShowTodo={setShowAddTodoList} toggleShowTodo={toggleAddTodoList} createUpdateTodo={createTodoList} />

      {/* Render the dropdown menu for adding new notes and todo lists */}
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

export default Add;