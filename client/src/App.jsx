import Builder from './Builder'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Navbar from './Navbar'
import './tailwind/tailwind.css'
import React, { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogged(true);
    }
    setLoading(false);
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
        <Home user={user} callback={logoutCallback} logged={logged} loading={loading}/>
      ),
    },
    {
      path: "/builder",
      element: (
        <>
          <Builder user={user} logged={logged} loading={loading}/>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <Login callback={loginCallback} logged={logged} />
      ),
    },
    {
      path: "/signup",
      element: (
        <Signup callback={loginCallback} logged={logged} />
      ),
    }
  ]);
  return (
    <>
      <Navbar callback={logoutCallback} user={user} logged={logged} />
      <RouterProvider router={router} />
    </>
  )
}

export default App
