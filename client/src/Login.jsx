import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [alert, setAlert] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.logged) {
            navigate("/");
        }
    }, [props.logged, navigate]);

    const login = async (event) => {
        event.preventDefault();

        console.log('test');
        const response = await fetch('/api/login', {
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
            <form onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username" value={username} className="form-control" placeholder="Enter username" onChange={uSetter}></input>
                    <a id="usernameHelp" className="form-text text-muted" href="/signup">Click here to sign up.</a>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} className="form-control" placeholder="Enter password" onChange={pSetter}></input>
                </div>

                <button type="submit" className="btn btn-primary">Login</button>

                {alert && <div className="alert alert-danger">Username or Password not found.</div>}
            </form>
        </>
    );
}

export default Login
