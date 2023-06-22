// Importing useState hook from React
import { useState } from 'react';
// Importing useAuthContext hook from useAuthContext
import { useAuthContext } from '../hooks/useAuthContext';

// Custom hook for user login functionality
export function useLogin(){
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    async function login(details) {
        setError(null)
        setIsLoading(true)
        const response = await fetch("api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        })
        const data = await response.json()

        setIsLoading(false)

        if (!response.ok) {
            setError(data.error)
        } 

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(data))

            // update the auth context
            dispatch({ type: "LOGIN", payload: data })
        }
    }

    return { login, error, isLoading}
}