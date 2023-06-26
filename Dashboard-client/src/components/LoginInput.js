
// Importing the MDBInput component from the 'mdb-react-ui-kit' library
import {
  MDBInput,
} from 'mdb-react-ui-kit';

// Defining a functional component called LoginInput that takes in several props
function LoginInput({ handleChange, name, label, value , type}) {
    // Returning the MDBInput component with the props passed in
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
