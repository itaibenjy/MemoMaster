
import { MDBCol, MDBContainer, MDBTypography, MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { useState } from "react";
import { MDBInputGroup, MDBCheckbox } from "mdb-react-ui-kit";
import { useDate } from "../hooks/useDate";
import TodoModal from "./TodoModal";
import ModalDialog from "./ModalDialog";
import useTodoItem from "../hooks/useTodoItem";
import Error from "./Error";




export default function ToDoList({toDoList, deleteTodoList, updateTodoList}) {

    const {title, childText, color, createdAt, _id} = toDoList;

    const {items, addItem, deleteItem, updateItem, isLoading, error, setItems} = useTodoItem(childText, _id);
    

    const [showModal, setShowModal] = useState(false);
    const [showUpdateTodo, setShowUpdateTodo] = useState(false);

    const [input, setInput] = useState('');

    const {dateFormat, toggleDateFormat} = useDate(createdAt);

    function toggleShowModal() {
        setShowModal(!showModal);
    }

    function toggleUpdateTodo() {
        setShowUpdateTodo(!showUpdateTodo);
    }

    function addItemHandler() {
        addItem({content: input});
        setInput('');
    }

    function handleKeyDown(e) {
        if(e.key === 'Enter') {
            addItemHandler();
        }
    }

    async function changeClicked(item, index) {
        const updatedItem = {...item, ifDone: !item.ifDone};
        const newItems = items.map((it, i) => i === index ? updatedItem : it);
        setItems(newItems);
        updateItem(updatedItem);
    }
    
      return (<>

<TodoModal key={toDoList._id} modalTitle="Update Todo List" modalButton="Update List" showTodo={showUpdateTodo} setShowTodo={setShowUpdateTodo} toggleShowTodo={toggleUpdateTodo} createUpdateTodo={updateTodoList} todo={toDoList}/>
<ModalDialog title="Delete Todo" content={`You are about to delete this entire Todo List?`} btnLabel="Delete" btnColor="danger" handleClick={()=> {toggleShowModal(); deleteTodoList(_id);}} showModel={showModal} setShowModal={setShowModal} toggleShow={toggleShowModal}/>  
    <MDBCol lg='4' md='6' sm='12' xs='12'>
        <MDBContainer className={`alert alert-${color}`} role="alert">
            <MDBContainer className="p-0 d-flex text-center">
                <MDBTypography tag="h4" className="ms-auto alert-heading text-center"><strong>{title}</strong></MDBTypography>
                <span className="ms-auto mb-1" aria-hidden="true">
                    <MDBBtn tag='a' color='none' className="ms-2"><MDBIcon fas icon='pencil-alt' onClick={toggleUpdateTodo}/></MDBBtn>
                    <MDBBtn tag='a' color='none'className="ms-3"><MDBIcon fas icon='trash-alt' onClick={toggleShowModal}/></MDBBtn>
                </span>
            </MDBContainer>
            <MDBContainer className="d-flex justify-content-center">
                 <MDBInputGroup className='mb-3'>
                    <input type='text' className={`custom-input form-control ${color}`} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}/>
                    <MDBBtn color={color==="dark" ? "light" : color==="light" ? "dark" : color} outline onClick={addItemHandler}><MDBIcon fas icon="plus" /></MDBBtn>
                </MDBInputGroup>
            </MDBContainer>

            <hr/>

            <MDBContainer className="">
                {items.map((item, index) => (
                    <MDBContainer key={index} className="d-flex justify-content-between">
                    <MDBCheckbox checked={item.ifDone} onChange={() => (changeClicked(item, index))} className={`custom-check-input ${color}`} color={color} key={index} label={item.content} />
                    {item.ifDone && <MDBBtn tag='a' color='none' className="ms-auto"><MDBIcon fas icon='trash-alt' onClick={() => (deleteItem(item))}/></MDBBtn>}
                    </MDBContainer>
                ))}
            </MDBContainer>

            
            <MDBContainer className="text-end">
                {isLoading && <MDBSpinner size='sm' color={color === "dark" ? "light" : color === "light" ? "dark" : color} />}
                <MDBTypography onClick={toggleDateFormat} tag='small'> {dateFormat} </MDBTypography>
            </MDBContainer>
            {error && <Error error={error}/>}
        </MDBContainer>
    </MDBCol>
    </>);
} 