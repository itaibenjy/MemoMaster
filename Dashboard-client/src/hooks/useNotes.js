// Import the useState and useEffect hooks from React
import {useState, useEffect} from 'react';
// Importing useAuthContext hook from useAuthContext
import { useAuthContext } from './useAuthContext'

// Define a custom hook to manage notes
export function useNotes() {
    // Define state variables for notes, error, and loading
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const {user} = useAuthContext();

    useEffect(() => {
        // Define the asynchronous function
        async function getNotes() {
            if (!user) return;
            setError(null);
            setLoading(true);
            // Send the request to the API
            try {
                const response = await fetch('api/note', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    const data = await response.json();
                    setError(data.error);
                    setLoading(false);
                    return;
                }

                // Extract the notes from the response
                const notes = await response.json();
                setNotes(notes);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        // Call the asynchronous function
        getNotes();
    }, [user]);


    // Add a new note for the authenticated user
    async function addNote (note) {
        setError(null);
        setLoading(true);
        const response = await fetch('api/note', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user.token}`
                        },
                        body: JSON.stringify(note)
                    });

        if (!response.ok) {
            const data = await response.json();
            setError(data.error);
            setLoading(false);
            return;
        }

        // Add the new note to the state
        const newNote = await response.json();
        setNotes([...notes, newNote]);
        setLoading(false);
    }

    // Delete a note by ID for the authenticated user
    async function deleteNote (id) {
        setError(null);
        setLoading(true);
        const response = await fetch(`api/note/${id}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    });

        if (!response.ok) {
            const data = await response.json();
            setError(data.error);
            setLoading(false);
            return;
        }

        // Remove the note from the state
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
        setLoading(false);
    }

    // Update a note by ID for the authenticated user
    async function updateNote (id, note) {
        setError(null)
        setLoading(true);
        const response = await fetch(`api/note/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user.token}`
                        },
                        body: JSON.stringify(note)
                    })

        if (!response.ok) {
            const data = await response.json();
            setError(data.message)
            setLoading(false);
            return;
         }

        const updatedNote = await response.json();
        // Update the note in the state
        setNotes(notes.map(nt => nt._id === id ? updatedNote : nt)); // <-- update the state with the newNotes array
        setLoading(false);
    }


    // Return the state variables and functions to be used in other components
    return {notes, error, loading, addNote, deleteNote, updateNote};
};