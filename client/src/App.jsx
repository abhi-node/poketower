import Builder from './Builder'
import Login from './Login'
import Signup from './Signup'
import React from 'react'
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [user, setUser] = React.useState(null);
  const [logged, setLogged] = React.useState(false);
  const loginCallback = (retrieved_user) => {
    setUser(retrieved_user);
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Builder user={user} />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <Login callback={loginCallback} />
      ),
    },
    {
      path: "/signup",
      element: (
        <Signup />
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
