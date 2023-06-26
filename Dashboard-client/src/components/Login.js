// Importing the useState hook from React
import { useState } from "react";

// Importing the useLogin hook from a custom hook
import { useLogin } from "../hooks/useLogin";

// Importing components from the mdb-react-ui-kit library
import { MDBSpinner, MDBBtn, MDBCol, MDBRow, MDBContainer} from 'mdb-react-ui-kit';

// Importing custom components
import LoginInput from "./LoginInput";
import Error from './Error';

// Defining the Login component
function Login(){

  // Destructuring the login, error, and isLoading variables from the useLogin hook
  const { login, error, isLoading } = useLogin()

  // Defining the details state variable using the useState hook
  const [details, setDetails] = useState({
    username: "",
    password: "",
  })

  // Defining the handleSubmit function, which is called when the form is submitted
  async function handleSubmit(event) {
    event.preventDefault();

    // Calling the login function with the details state variable
    await login(details)
  }

  // Defining the handleChange function, which is called when an input field is changed
  function handleChange(event) {
    const { name, value } = event.target;
    setDetails(prevDetails => {
      return {
        ...prevDetails,
        [name]: value
      }
    })
  }

  // Defining arrays for the labels, names, and types of the input fields
  const labels = ["Username", "Password"]
  const names = ["username", "password"]
  const types = ["text", "password"]

  // Returning the Login component
  return (
          <form onSubmit={handleSubmit}>
            <h3 className="my-3">Log in</h3>
            {/* Mapping over the labels array to create LoginInput components */}
            {labels.map((label, index) => {
              return (
                <LoginInput
                  key={index}
                  handleChange={handleChange}
                  name={names[index]}
                  label={label}
                  value={details[names[index]]}
                  type={types[index]}
                />
              )})}
              {/* Rendering the Error component if there is an error */}
              {error && <Error error={error}  />}
              {/* Rendering a spinner if isLoading is true, otherwise rendering a submit button */}
              {isLoading ? 
              <MDBBtn disabled className='me-2'>
                <MDBSpinner size='sm' role='status' tag='span' className="my-2"/>
                <span className='visually-hidden'>Loading...</span>
              </MDBBtn> 
              :
              <MDBBtn type='submit' size='lg' className='my-2'>Log in</MDBBtn>
              }
          </form>
  )
}

// Exporting the Login component as the default export
export default Login