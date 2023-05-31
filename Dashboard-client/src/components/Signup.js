// Importing the Error component, useState hook, and useSignup custom hook from their respective files
import Error from './Error';
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

// components
import LoginInput from "../components/LoginInput";
import { MDBSpinner, MDBBtn} from 'mdb-react-ui-kit';

// Defining the Signup component
function Signup(){

  // Initializing the details state object using the useState hook
  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  })

  // Destructuring the signup, error, and isLoading variables from the useSignup hook
  const {signup, error, isLoading} = useSignup()

  // Defining the handleSubmit function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    // Calling the signup function from the useSignup hook with the details object as an argument
    await signup(details);
  }

  // Defining the handleChange function to handle input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setDetails(prevDetails => {
      return {
        ...prevDetails,
        [name]: value
      }
    })
  }

  // Defining the labels, names, and types arrays to be used in the LoginInput components
  const labels = ["Username", "Password", "Confirm Password", "First Name", "Last Name", "Email"]
  const names = ["username", "password", "confirmPassword", "firstName", "lastName", "email"]
  const types = ["text", "password", "password", "text", "text", "email" ]

  // Returning the Signup component with a form that includes LoginInput components for each input field, an error component if there is an error, and a submit button that is disabled while isLoading is true
  return (
    <form onSubmit={handleSubmit} className="text-center">
      <h3 className="my-3">Sign Up</h3>
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
        {error && <Error error={error}  />}
        {isLoading ? 
        <MDBBtn disabled className='me-2'>
          <MDBSpinner size='sm' role='status' tag='span' className="my-2"/>
          <span className='visually-hidden'>Loading...</span>
        </MDBBtn> 
        :
        <MDBBtn type='submit' size='lg' className='my-2'>Sign Up</MDBBtn>
        }
    </form>
  )
}

// Exporting the Signup component as the default export
export default Signup