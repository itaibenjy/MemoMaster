
function LoginInput({ handleChange, name, label, value , type}) {
    return (
    <div>
      <label >{label}</label>
      <input
       type={type}
       name={name}
       onChange={handleChange}
       value={value}
       />
    </div>
    )
}

export default LoginInput;