import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Builder(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.logged) {
      navigate("/login");
    }
  }, [props.logged, navigate]);

  const sendTeam = (event) => {
    
  }

  if (!props.logged) {
    return null;
  }
  return (
    <>
      <h1>{props.user.username}</h1>
      <form onSubmit={sendTeam}>
        <div className="form-group">
          <label htmlFor="name" className="form-control">Pokemon:
            <input id="name"></input>
          </label>
        </div>

        <div>
          <label htmlFor="item" className="form-control">Item:
            <input id="item"></input>
          </label>
        </div>

        <div>
          <label htmlFor="ability" className="form-control">Ability:
            <input id="ability"></input>
          </label>
        </div>

        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default Builder
