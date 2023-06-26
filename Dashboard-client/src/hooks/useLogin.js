// Importing the useState hook from the React library
import { useState } from 'react';

// Importing the useAuthContext hook from a custom file
import { useAuthContext } from '../hooks/useAuthContext';

// Creating a custom hook called useLogin
export function useLogin(){

    // Initializing state variables using the useState hook
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null)

    // Destructuring the dispatch function from the useAuthContext hook
    const { dispatch } = useAuthContext()

    // Defining an asynchronous function called login that takes in user details as a parameter
    async function login(details) {

        // Resetting the error state variable to null
        setError(null)

        // Setting the isLoading state variable to true
        setIsLoading(true)

        // Sending a POST request to the server with the user details
        const response = await fetch("api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        })

        // Parsing the response data as JSON
        const data = await response.json()

        // Setting the isLoading state variable to false
        setIsLoading(false)

        // If the response is not ok, setting the error state variable to the error message returned by the server
        if (!response.ok) {
            setError(data.error)
        } 

        // If the response is ok, saving the user data to local storage and updating the auth context
        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(data))
            dispatch({ type: "LOGIN", payload: data })
        }
    }

    // Returning an object containing the login function, error state variable, and isLoading state variable
    return { login, error, isLoading}
}