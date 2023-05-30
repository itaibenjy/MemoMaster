import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

// components
import LoginInput from "./LoginInput";
import Error from './Error';
import { MDBSpinner, MDBBtn, MDBCol, MDBRow, MDBContainer} from 'mdb-react-ui-kit';


function Login(){
  const { login, error, isLoading } = useLogin()

  const [details, setDetails] = useState({
    username: "",
    password: "",
  })

  async function handleSubmit(event) {
    event.preventDefault();

    
    await login(details)
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

  const labels = ["Username", "Password"]
  const names = ["username", "password"]
  const types = ["text", "password"]

  return (
          <form onSubmit={handleSubmit}>
            <h3 className="my-3">Log in</h3>
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
              <MDBBtn type='submit' size='lg' className='my-2'>Log in</MDBBtn>
              }
          </form>
  )
}

export default Login