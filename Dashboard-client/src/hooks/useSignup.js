// Import the useState hook from React
import { useState } from 'react';

// Import the useAuthContext hook from another file
import { useAuthContext } from '../hooks/useAuthContext';

// Define a custom hook called useSignup
export function useSignup(){

    // Initialize state variables for error and loading status
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null)

    // Get the dispatch function from the useAuthContext hook
    const { dispatch } = useAuthContext()

    // Define an async function called signup that takes in user details
    async function signup(details) {

        // Clear any previous errors
        setError(null)

        // Check if the passwords match
        if (details.password !== details.confirmPassword) {
            setError("Passwords do not match")
            return;
        }

        // Set the loading status to true
        setIsLoading(true)

        // Send a POST request to the server with the user details
        const response = await fetch("api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        })

        // Parse the response data as JSON
        const data = await response.json()

        // Set the loading status to false
        setIsLoading(false)

        // If the response is not ok, log the response and set the error state
        if (!response.ok) {
            setError(data.error)
        } 

        // If the response is ok, save the user to local storage and update the auth context
        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(data))
            dispatch({ type: "LOGIN", payload: data })
        }
    }

    // Return an object with the signup function, error state, and loading status
    return { signup, error, isLoading}
}