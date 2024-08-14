import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.logged) {
      navigate("/login");
    }
  }, [props.logged, navigate]);

  const logout = (event) => {
    props.callback();
  }

  if (!props.logged) {
    return null;
  }
  return (
    <>
      <h1>{props.user.username}</h1>
      <form onSubmit={logout}>

        <button className="btn btn-primary" type="submit">Logout</button>
      </form>
    </>
  );
}

export default Home
