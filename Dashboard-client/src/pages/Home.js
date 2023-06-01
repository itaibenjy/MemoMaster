// Importing the necessary hooks and components from various files
import { useNavigate } from 'react-router-dom'; // used to navigate to different routes
import { useAuthContext } from '../hooks/useAuthContext'; // custom hook for authentication context
import { useEffect } from 'react'; // used to perform side effects in functional components
import { useNotes } from '../hooks/useNotes'; // custom hook for notes 
import { useTodoList } from '../hooks/useToDoList'; // custom hook for todoList 
import { useElements } from '../hooks/useElements'; // custom hook for elements

// Importing the necessary components from the MDB React UI Kit
import { MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { MDBCard, MDBRow, MDBSpinner} from 'mdb-react-ui-kit';

// Importing the necessary components from the components folder
import Watch from '../components/Watch';
import Add from '../components/Add';
import Note from '../components/Note';
import ToDoList from '../components/ToDoList';
import Error from '../components/Error';
import Loading from '../components/Loading';

// Exporting the Home component as the default export
export default function Home() {

  // Using the custom hooks to get the user and navigate to different routes
  const {user} = useAuthContext()
  const navigate = useNavigate()

  // Using the custom hook to get the notes and addNote function
  const {notes, addNote, deleteNote, updateNote, loading, error} = useNotes()
  const {todoLists, todoListError, todoListLoading, addTodoList, deleteTodoList, updateTodoList} = useTodoList()
  const {allElements, sortByDate, sortByDateReverse} = useElements([notes, todoLists])

  // Using the useEffect hook to redirect to the login page if the user is not logged in
  useEffect(() => {
      if (!user) {
      navigate("/")
      }}, [user])

  // Returning the JSX for the Home component
  return (<>
    {(loading || todoListLoading) && <Loading/>}
    <MDBContainer className='p-1'>
    <MDBContainer fluid className="d-flex justify-content-center align-items-center mt-4">
      <MDBTypography tag='h1'  style={{fontFamily: 'Monomania'}} className='display-1'>  Welcome {user?.name}! </MDBTypography>
    </MDBContainer>
    <MDBContainer fluid className="d-flex justify-content-center align-items-center">
      <Watch />
    </MDBContainer>
    <MDBContainer fluid className="d-flex justify-content-end mt-3 mb-1">
      <Add addNote={addNote} addTodoList={addTodoList}/>
    </MDBContainer>
    {(error || todoListError) && <Error error={error ? error : todoListError}/>}
    <MDBCard style={{ height: '100%', minHeight: '60vh' }} className="p-2">
      <MDBRow className="">
        {notes.map((note, index) => (
          <Note key={index} note={note} deleteNote={deleteNote} updateNote={updateNote}/>
        ))}
        {todoLists.map((toDoList, index) => (
          <ToDoList key={index} toDoList={toDoList} deleteTodoList={deleteTodoList} updateTodoList={updateTodoList}/>
        ))}
      </MDBRow>
    </MDBCard>
    </MDBContainer>
    </>
  )
}