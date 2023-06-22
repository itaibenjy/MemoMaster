// Import the useState and useEffect hooks from React
import { useState, useEffect } from 'react';
// Importing useAuthContext hook from useAuthContext
import { useAuthContext } from './useAuthContext';

// Custom hook for managing todo items
export function useTodoList() {
  const [todoLists, setTodoLists] = useState([]);
  const [todoListError, setTodoListError] = useState(null);
  const [todoListLoading, setLoading] = useState(false);
  
  const { user } = useAuthContext();

  useEffect(() => {
    // Function to get all to do
    async function getTodoLists() {
      if (!user) return;
      setTodoListError(null);
      setLoading(true);
      
      try{
        const response = await fetch('api/todo', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          const data = await response.json();
          setTodoListError(data.todoListError);
          setLoading(false);
          return;
        }

        const todoLists = await response.json();
        await setTodoLists(todoLists);
        setLoading(false);

      } catch (error) {
        setTodoListError(error.message);
        setLoading(false);
      }

      
    }

    getTodoLists();
    
  }, []);

  // Function to add new to do list
  async function addTodoList (todo) {
    setTodoListError(null);
    setLoading(true);

    try {
      const response = await fetch('api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(todo)
      });
      if (!response.ok) {
        const data = await response.json();
        setTodoListError(data.todoListError);
        setLoading(false);
        return;
      }

      const newTodo = await response.json();
      setTodoLists([...todoLists, newTodo]);
      setLoading(false);
    }
    catch (error) {
      setTodoListError(error.message);
      setLoading(false);
    }
  }

  // Function to delete to do
  async function deleteTodoList (id) {
    setTodoListError(null);
    setLoading(true);

    try {
      const response = await fetch(`api/todo/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      if (!response.ok) {
        const data = await response.json();
        setTodoListError(data.todoListError);
        setLoading(false);
        return;
      }

      const newTodos = todoLists.filter(todo => todo._id !== id);
      setTodoLists(newTodos);
      setLoading(false);
    } catch (error) {
      setTodoListError(error.message);
      setLoading(false);
    }

  }

  // Function to update to do
  async function updateTodoList (id, todo) {
    setTodoListError(null);
    setLoading(true);

    const response = await fetch(`api/todo/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(todo)
    });

    if (!response.ok) {
      const data = await response.json();
      setTodoListError(data.message);
      setLoading(false);
      return;
    }

    const updatedTodo = await response.json();
    setTodoLists(todoLists.map(td => td._id === id ? updatedTodo : td));
    setLoading(false);
  }

  return { todoLists, todoListError, todoListLoading, addTodoList, deleteTodoList, updateTodoList };
}
