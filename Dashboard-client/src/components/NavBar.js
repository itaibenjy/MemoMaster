import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"


function NavBar(){

    const { logout } = useLogout()

    function handleClick() {
        logout()    
    }

    return(
        <header>
            <div>
                <h1>NavBar</h1>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Log In</Link>
                <div>
                    <button onClick={handleClick}>Log Out</button>
                </div>
            </div>
        </header>
    )

}