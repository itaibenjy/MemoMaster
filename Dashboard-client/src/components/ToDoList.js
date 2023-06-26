import { MDBCol, MDBContainer, MDBTypography, MDBBtn, MDBIcon, MDBSpinner, MDBTooltip } from "mdb-react-ui-kit";
import { useState } from "react";
import { MDBInputGroup, MDBCheckbox } from "mdb-react-ui-kit";
import { useDate } from "../hooks/useDate";
import TodoModal from "./TodoModal";
import ModalDialog from "./ModalDialog";
import SelectDateTime from "./SelectDateTime";
import useTodoItem from "../hooks/useTodoItem";
import Error from "./Error";

// This component displays a single to-do list, including its title, items, and creation date.
// It also allows the user to add, delete, and update items, as well as delete the entire list.
export default function ToDoList({toDoList, deleteTodoList, updateTodoList}) {

    // Destructure the properties of the to-do list object
    const {title, childText, color, createdAt, _id} = toDoList;

    // Use the useTodoItem hook to manage the list items
    const {items, addItem, deleteItem, updateItem, isLoading, error, setItems} = useTodoItem(childText, _id);
    
    // State variables for showing/hiding the update and delete modals
    const [showModal, setShowModal] = useState(false);
    const [showUpdateTodo, setShowUpdateTodo] = useState(false);

    // State variable for the input field when adding a new item
    const [input, setInput] = useState('');

    // Use the useDate hook to format the creation date
    const {dateFormat, toggleDateFormat, timeAgo, date} = useDate(createdAt);

    // Function to toggle the visibility of the delete modal
    function toggleShowModal() {
        setShowModal(!showModal);
    }

    // Function to toggle the visibility of the update modal
    function toggleUpdateTodo() {
        setShowUpdateTodo(!showUpdateTodo);
    }

    // Function to add a new item to the list
    function addItemHandler() {
        addItem({content: input});
        setInput('');
    }

    // Function to handle the "Enter" key press when adding a new item
    function handleKeyDown(e) {
        if(e.key === 'Enter') {
            addItemHandler();
        }
    }

    // Function to toggle the "ifDone" property of an item and update it in the database
    async function changeClicked(item, index) {
        const updatedItem = {...item, ifDone: !item.ifDone};
        const newItems = items.map((it, i) => i === index ? updatedItem : it);
        setItems(newItems);
        updateItem(updatedItem);
    }
    
    // Render the component
    return (<>
        {/* Modal for updating the to-do list */}
        <TodoModal key={toDoList._id} modalTitle="Update Todo List" modalButton="Update List" showTodo={showUpdateTodo} setShowTodo={setShowUpdateTodo} toggleShowTodo={toggleUpdateTodo} createUpdateTodo={updateTodoList} todo={toDoList}/>
        {/* Modal for deleting the entire to-do list */}
        <ModalDialog title="Delete Todo" content={`You are about to delete this entire Todo List?`} btnLabel="Delete" btnColor="danger" handleClick={()=> {toggleShowModal(); deleteTodoList(_id);}} showModel={showModal} setShowModal={setShowModal} toggleShow={toggleShowModal}/>  
        {/* Container for the entire to-do list */}
        <MDBCol lg='4' md='6' sm='12' xs='12'>
            <MDBContainer className={`alert alert-${color}`} role="alert">
                {/* Container for the to-do list title and edit/delete buttons */}
                <MDBContainer className="p-0 d-flex text-center">
                    <MDBTypography tag="h4" className="ms-auto alert-heading text-center"><strong>{title}</strong></MDBTypography>
                    <span className="ms-auto mb-1" aria-hidden="true">
                        {/* Button to edit the entire to-do list */}
                        <MDBTooltip tag="span" title={"Edit To Do"}>
                            <MDBBtn tag='a' color='none' className="ms-2"><MDBIcon fas icon='pencil-alt' onClick={toggleUpdateTodo}/></MDBBtn>
                        </MDBTooltip>
                        {/* Button to delete the entire to-do list */}
                        <MDBTooltip tag="span" title={"Delete To Do"}>
                            <MDBBtn tag='a' color='none'className="ms-3"><MDBIcon fas icon='trash-alt' onClick={toggleShowModal}/></MDBBtn>
                        </MDBTooltip>
                    </span>
                </MDBContainer>
                {/* Container for the input field and "Add" button */}
                <MDBContainer className="d-flex justify-content-center">
                    <MDBInputGroup className='mb-3'>
                        <input type='text' className={`custom-input form-control ${color}`} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}/>
                        <MDBBtn color={color==="dark" ? "light" : color==="light" ? "dark" : color} outline onClick={addItemHandler}><MDBIcon fas icon="plus" /></MDBBtn>
                    </MDBInputGroup>
                </MDBContainer>

                <hr/>

                {/* Container for the list items */}
                <MDBContainer className="">
                    {items.map((item, index) => (
                        <MDBContainer key={index} className="d-flex p-0">
                            {/* Button to delete an item */}
                            {item.ifDone ? <MDBBtn tag='a' color='none' className="me-1"><MDBIcon fas icon='trash-alt' onClick={() => (deleteItem(item))}/></MDBBtn> : <div style={{width:"18px"}}/>}
                            {/* Checkbox to mark an item as done */}
                            <MDBCheckbox checked={item.ifDone} onChange={() => (changeClicked(item, index))} className={`custom-check-input ${color}`} color={color} key={index} label={item.content} />
                            {/* Component to select a date/time for an item */}
                            <SelectDateTime className="ms-auto" item={item} index={index} setItems={setItems} updateItem={updateItem}/>
                        </MDBContainer>
                    ))}
                </MDBContainer>

                {/* Container for the loading spinner and creation date */}
                <MDBContainer className="text-end">
                    {isLoading && <MDBSpinner size='sm' color={color === "dark" ? "light" : color === "light" ? "dark" : color} />}
                    {/* Tooltip to display the creation date */}
                    <MDBTooltip placement='bottom' tag="span" title={<> {timeAgo} <br></br> {date} </>}>
                        <MDBTypography onClick={toggleDateFormat} tag='small'> {dateFormat} </MDBTypography>
                    </MDBTooltip>
                </MDBContainer>
                {/* Error message if there was an error fetching/updating the items */}
                {error && <Error error={error}/>}
            </MDBContainer>
        </MDBCol>
    </>);}

