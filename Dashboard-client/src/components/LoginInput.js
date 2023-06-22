// Importing MDBInput component from the mdb-react-ui-kit library 
import {
  MDBInput,
} from 'mdb-react-ui-kit';

// LoginInput component
function LoginInput({ handleChange, name, label, value , type}) {
    return (
      <MDBInput className='my-3'
          type={type}
          size="lg"
          value={value}
          name={name}
          onChange={handleChange}
          required
          label={label}
        />
    )
}

export default LoginInput;
