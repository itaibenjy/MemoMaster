import { useState } from "react";
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

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(details);
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

      <button type="submit">Sign Up</button>
    </form>
  )
}

export default Signup