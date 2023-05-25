import { useState } from "react";
import LoginInput from "../components/LoginInput";
import { useLogin } from "../hooks/useLogin";

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
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
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

      <button disabled={isLoading} type="submit">Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login