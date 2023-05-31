import Error from './Error';
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

// components
import LoginInput from "../components/LoginInput";
import { MDBSpinner, MDBBtn} from 'mdb-react-ui-kit';

function Signup(){
  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  })

  const {signup, error, isLoading} = useSignup()

  async function handleSubmit(event) {
    event.preventDefault();

    await signup(details);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setDetails(prevDetails => {
      return {
        ...prevDetails,
        [name]: value
      }
    })
  }

  const labels = ["Username", "Password", "Confirm Password", "First Name", "Last Name", "Email"]
  const names = ["username", "password", "confirmPassword", "firstName", "lastName", "email"]
  const types = ["text", "password", "password", "text", "text", "email" ]

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

export default Signup