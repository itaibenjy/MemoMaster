import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

// components
import LoginInput from "../components/LoginInput";

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
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
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

      <button disabled={isLoading} onClick={handleChange}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup