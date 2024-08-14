import Builder from './Builder'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import React, {useState, useEffect} from 'react'
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogged(true);
    }
  }, []);
  const loginCallback = (retrieved_user) => {
    localStorage.setItem('user', JSON.stringify(retrieved_user));
    setUser(retrieved_user);
    setLogged(true);
  }
  const logoutCallback = () => {
    localStorage.removeItem('user');
    setUser(null);
    setLogged(false);
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home user={user} callback={logoutCallback} logged={logged}/>
      ),
    },
    {
      path: "/builder",
      element: (
        <>
          <Builder user={user} logged={logged}/>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <Login callback={loginCallback} logged={logged}/>
      ),
    },
    {
      path: "/signup",
      element: (
        <Signup callback={loginCallback} logged={logged}/>
      ),
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
