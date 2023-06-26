import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export function useTodoList() {
  // Define state variables for todoLists, todoListError, and todoListLoading
  const [todoLists, setTodoLists] = useState([]);
  const [todoListError, setTodoListError] = useState(null);
  const [todoListLoading, setLoading] = useState(false);
  
  // Get the user object from the authentication context
  const { user } = useAuthContext();

  // Use the useEffect hook to fetch the user's todo lists when the component mounts
  useEffect(() => {
    async function getTodoLists() {
      // If there is no user, return
      if (!user) return;
      // Clear any previous errors and set loading to true
      setTodoListError(null);
      setLoading(true);
      
      try{
        // Make a GET request to the server to fetch the user's todo lists
        const response = await fetch('api/todo', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        // If the response is not ok, set the error state and stop loading
        if (!response.ok) {
          const data = await response.json();
          setTodoListError(data.todoListError);
          setLoading(false);
          return;
        }

        // If the response is ok, set the todoLists state and stop loading
        const todoLists = await response.json();
        await setTodoLists(todoLists);
        setLoading(false);

      } catch (error) {
        // If there is an error, set the error state and stop loading
        setTodoListError(error.message);
        setLoading(false);
      }
    }

    // Call the getTodoLists function
    getTodoLists();
    
  }, []);

  // Define a function to add a new todo list
  async function addTodoList (todo) {
    // Clear any previous errors and set loading to true
    setTodoListError(null);
    setLoading(true);

    try {
      // Make a POST request to the server to add the new todo list
      const response = await fetch('api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(todo)
      });
      // If the response is not ok, set the error state and stop loading
      if (!response.ok) {
        const data = await response.json();
        setTodoListError(data.todoListError);
        setLoading(false);
        return;
      }

      // If the response is ok, add the new todo list to the todoLists state and stop loading
      const newTodo = await response.json();
      setTodoLists([...todoLists, newTodo]);
      setLoading(false);
    }
    catch (error) {
      // If there is an error, set the error state and stop loading
      setTodoListError(error.message);
      setLoading(false);
    }
  }

  // Define a function to delete a todo list
  async function deleteTodoList (id) {
    // Clear any previous errors and set loading to true
    setTodoListError(null);
    setLoading(true);

    try {
      // Make a DELETE request to the server to delete the specified todo list
      const response = await fetch(`api/todo/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      // If the response is not ok, set the error state and stop loading
      if (!response.ok) {
        const data = await response.json();
        setTodoListError(data.todoListError);
        setLoading(false);
        return;
      }

      // If the response is ok, remove the deleted todo list from the todoLists state and stop loading
      const newTodos = todoLists.filter(todo => todo._id !== id);
      setTodoLists(newTodos);
      setLoading(false);
    } catch (error) {
      // If there is an error, set the error state and stop loading
      setTodoListError(error.message);
      setLoading(false);
    }
  }

  // Define a function to update a todo list
  async function updateTodoList (id, todo) {
    // Clear any previous errors and set loading to true
    setTodoListError(null);
    setLoading(true);

    // Make a PATCH request to the server to update the specified todo list
    const response = await fetch(`api/todo/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(todo)
    });

    // If the response is not ok, set the error state and stop loading
    if (!response.ok) {
      const data = await response.json();
      setTodoListError(data.message);
      setLoading(false);
      return;
    }

    // If the response is ok, update the specified todo list in the todoLists state and stop loading
    const updatedTodo = await response.json();
    setTodoLists(todoLists.map(td => td._id === id ? updatedTodo : td));
    setLoading(false);
  }

  // Return the todoLists state, todoListError state, todoListLoading state, and the addTodoList, deleteTodoList, and updateTodoList functions
  return { todoLists, todoListError, todoListLoading, addTodoList, deleteTodoList, updateTodoList };
}
