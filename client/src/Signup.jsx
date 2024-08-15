import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={signup} className="w-35 p-4 border rounded shadow-sm">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png" width="80px" className="mx-auto d-block"/>
          <h1 className="h3 mb-3 text-center">PokeTower</h1>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              value={username}
              className="form-control"
              placeholder="Enter username"
              onChange={uSetter}
            />
            <small id="usernameHelp" className="form-text">
              <a href="/login">Already have an account? Click here to login.</a>
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              className="form-control"
              placeholder="Enter password"
              onChange={pSetter}
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">Sign Up</button>

          {alert && <div className="alert alert-danger mt-3">Username or Password not found.</div>}
        </form>
      </div >
    </>
  );
}

export default Signup
