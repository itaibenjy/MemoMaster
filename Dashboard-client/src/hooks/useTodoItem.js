import {useState} from 'react';
import { useAuthContext } from './useAuthContext';

export default function useTodoItem (initialItems, todoId) {
    const [items, setItems] = useState(initialItems);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user}  = useAuthContext();


    function addItem(item) {
        setIsLoading(true);
        setError(null);

        fetch(`/api/todoText/${todoId}`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
            Authorization: `Bearer ${user.token}`
        })
        .then(res => {
            if(!res.ok) {
                throw Error('Could not add item');
            }
            return res.json();
        })
        .then(data => {
            setItems([...items, data]);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.message);
        })
    }

    function deleteItem(item){
        setIsLoading(true);
        setError(null);

        fetch(`/api/todoText/${item._id}`, {
            method: 'DELETE',
            Authorization: `Bearer ${user.token}`
        })
        .then(res => {
            if(!res.ok) {
                throw Error('Could not delete item');
            }
            return res.json();
        })
        .then(data => {
            setItems(items.filter(it => it._id !== item._id));
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.message);
        })
    }

    function updateItem(item) {
        setIsLoading(true);
        setError(null);

        fetch(`/api/todoText/${item._id}`, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
            Authorization: `Bearer ${user.token}`
        })
        .then(res => {
            if(!res.ok) {
                throw Error('Could not update item');
            }
            return res.json();
        })
        .then(data => {
            setItems(items.map(item => item._id === data._id ? data : item));
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.message);
        })
    }

    return {items, addItem, deleteItem, updateItem, isLoading, error, setItems};
}