// This function is a React component that takes an error message as a prop and return a danger alert with the error message.
function Error({error}) {
  return    <div className="alert alert-danger py-2 " role="alert" data-mdb-color="danger">
                <i className="fas fa-times-circle me-3"></i>{error}
            </div>;
}

export default Error;
