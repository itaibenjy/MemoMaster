
export function Error({error}) {
  return    <div className="alert alert-danger" role="alert" data-mdb-color="danger">
                <i className="fas fa-times-circle me-3"></i>{error}
            </div>;
}
  