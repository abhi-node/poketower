import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [alert, setAlert] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.logged) {
      navigate("/");
    }
  }, [props.logged, navigate]);
  const signup = async (event) => {
    event.preventDefault();

    console.log('test');
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const user = await response.json();

    if (response.ok) {
      setAlert(false);
      props.callback(user);
      console.log(user, 'successful');
      navigate("/");
    } else if (response.status === 400) {
      setAlert(true);
      console.log('Username or Password incorrect');
    } else {
      console.log('error');
    }
  }
  const uSetter = (event) => {
    setUsername(event.target.value);
  }

  const pSetter = (event) => {
    setPassword(event.target.value);
  }
  return (
    <>
      <form onSubmit={signup}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={uSetter} className="form-control" placeholder="Enter username"></input>
          <a id="usernameHelp" className="form-text text-muted" href="/login">Already have an account? Click here to log in.</a>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={pSetter} className="form-control" placeholder="Enter password"></input>
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </>
  );
}

export default Signup
