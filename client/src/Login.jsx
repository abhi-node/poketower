import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

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
            <div className="flex justify-center items-center min-h-screen">
                <form onSubmit={login} className="w-full max-w-md p-4 border rounded shadow-sm">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png"
                        width="80px"
                        className="mx-auto block"
                        alt="Pokeball icon"
                    />
                    <h1 className="text-3xl font-bold text-center mb-3">PokeTower</h1>
                    <div className="mb-3">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="username"
                            value={username}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter username"
                            onChange={uSetter}
                        />
                        <small id="usernameHelp" className="text-xs text-gray-500 mt-1">
                            <a href="/signup" className="text-indigo-600 hover:text-indigo-500">Don't have an account? Click here to sign up.</a>
                        </small>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter password"
                            onChange={pSetter}
                        />
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Login
                    </button>

                    {alert && <div className="mt-3 text-center text-red-600">Username or Password not found.</div>}
                </form>
            </div>
        </>

    );
}

export default Login
