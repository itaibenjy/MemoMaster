import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox
} from 'mdb-react-ui-kit';


function LoginInput({ handleChange, name, label, value , type}) {
    return (
      <MDBInput
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