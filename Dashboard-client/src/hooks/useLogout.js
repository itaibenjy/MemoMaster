// Importing useAuthContext hook from useAuthContext
import { useAuthContext } from "./useAuthContext"

// Custom hook for user log out functionality
export function useLogout() {

    const { dispatch } = useAuthContext()

    function logout() {
        // remove user from storage
        localStorage.removeItem("user")
        
        // dispatch logout action
        dispatch({ type: "LOGOUT" })
    }

    return { logout }

}