// Importing useState hook from React
import {useState} from 'react';
// Importing useAuthContext hook from useAuthContext.js file
import { useAuthContext } from './useAuthContext';

// Defining a custom hook called useTodoItem
export default function useTodoItem (initialItems, todoId) {
    // Initializing items state with initialItems
    const [items, setItems] = useState(initialItems);

    // Initializing isLoading state with false
    const [isLoading, setIsLoading] = useState(false);
    // Initializing error state with null
    const [error, setError] = useState(null);
    // Getting user object from useAuthContext hook
    const {user}  = useAuthContext();

    // Function to add a new item to the todo list
    function addItem(item) {
        // Setting isLoading to true
        setIsLoading(true);
        // Setting error to null
        setError(null);

        // Sending a POST request to the server to add the item to the todo list
        fetch(`api/todoText/${todoId}`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
        })
        .then(res => {
            // If the response is not ok, throw an error
            if(!res.ok) {
                throw Error('Could not add item');
            }
            // Otherwise, return the response as JSON
            return res.json();
        })
        .then(data => {
            // Adding the new item to the items array
            setItems([...items, data]);
            // Setting isLoading to false
            setIsLoading(false);
        })
        .catch(err => {
            // Setting isLoading to false
            setIsLoading(false);
            // Setting error to the error message
            setError(err.message);
        })
    }

    // Function to delete an item from the todo list
    function deleteItem(item){
        // Setting isLoading to true
        setIsLoading(true);
        // Setting error to null
        setError(null);

        // Sending a DELETE request to the server to delete the item from the todo list
        fetch(`api/todoText/${item._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            // If the response is not ok, throw an error
            if(!res.ok) {
                throw Error('Could not delete item');
            }
            // Otherwise, return the response as JSON
            return res.json();
        })
        .then(data => {
            // Removing the deleted item from the items array
            setItems(items.filter(it => it._id !== item._id));
            // Setting isLoading to false
            setIsLoading(false);
        })
        .catch(err => {
            // Setting isLoading to false
            setIsLoading(false);
            // Setting error to the error message
            setError(err.message);
        })
    }

    // Function to update an item in the todo list
    function updateItem(item) {
        // Setting isLoading to true
        setIsLoading(true);
        // Setting error to null
        setError(null);

        // Sending a PATCH request to the server to update the item in the todo list
        fetch(`api/todoText/${item._id}`, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            // If the response is not ok, throw an error
            if(!res.ok) {
                throw Error('Could not update item');
            }
            // Otherwise, return the response as JSON
            return res.json();
        })
        .then(data => {
            // Updating the item in the items array
            setItems(items.map(item => item._id === data._id ? data : item));
            // Setting isLoading to false
            setIsLoading(false);
        })
        .catch(err => {
            // Setting isLoading to false
            setIsLoading(false);
            // Setting error to the error message
            setError(err.message);
        })
    }

    // Returning an object with items, addItem, deleteItem, updateItem, isLoading, error, and setItems
    return {items, addItem, deleteItem, updateItem, isLoading, error, setItems};
}