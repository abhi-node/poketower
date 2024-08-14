function Signup() {
    const signup = (event) => {
        
    }
    return (
      <>
        <form onSubmit={signup}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" className="form-control" placeholder="Enter username"></input>
            <a id="usernameHelp" className="form-text text-muted" href="/login">Already have an account? Click here to log in.</a>
          </div>
    
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="username" className="form-control" placeholder="Enter password"></input>
          </div>
  
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </>
    );
  }
  
  export default Signup
  