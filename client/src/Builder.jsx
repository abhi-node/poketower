import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PokemonBuilder from './BuilderTools/PokemonBuilder';
import ItemBuilder from './BuilderTools/ItemBuilder';

function Builder(props) {

  const navigate = useNavigate();

  useEffect(() => {
    console.log(props.logged);
    if (!props.loading && !props.logged) {
      navigate("/login");
    }
  }, [props.logged, props.loading]);

  const sendTeam = (event) => {

  }

  if (!props.logged) {
    return null;
  }
  return (
    <>
      <form onSubmit={sendTeam}>
        <PokemonBuilder />

        <ItemBuilder />

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
