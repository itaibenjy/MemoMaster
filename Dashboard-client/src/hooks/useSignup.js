// Import the useState hook from React
import { useState } from 'react';
// Importing useAuthContext hook from useAuthContext
import { useAuthContext } from '../hooks/useAuthContext';


// Custom hook for user signup functionality
export function useSignup(){
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    async function signup(details, setShowModal, setLogin) {
        setError(null)

        // check if the passwords match
        if (details.password !== details.confirmPassword) {
        setError("Passwords do not match")
        return;
        }

        setIsLoading(true)
        const response = await fetch("api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        })
        const data = await response.json()

        setIsLoading(false)

        if (!response.ok) {
            console.log(response)
            setError(data.error)
        } 

        if (response.ok) {

            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(data))

            // update the auth context
            dispatch({ type: "LOGIN", payload: data })
        }
    }

    return { signup, error, isLoading}
}