import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Builder(props) {
  const [pokeList, setPokeList] = useState([]);
  const [showP, setShowP] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(props.logged);
    if (!props.loading && !props.logged) {
      navigate("/login");
    }
  }, [props.logged, navigate]);

  const fetchList = async () => {
    const response = await fetch('/api/pokemon/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonPromise = await response.json();

    if (response.ok) {
      console.log(await jsonPromise);
      setPokeList(jsonPromise.list);
    } else {
      console.log('Error with getting list');
    }
  }

  const pokeQuery = async (event) => {
    if (pokeList.length === 0) {
      await fetchList();
    }
    if (event.target.value !== "") {
      setShowP(true);
    } else {
      setShowP(false);
    }
  }

  const sendTeam = (event) => {

  }

  if (!props.logged) {
    return null;
  }
  return (
    <>
      <h1>{props.user.username}</h1>
      <form onSubmit={sendTeam}>
        <div className="relative group">
          <label htmlFor="name" className="form-label">
            Pokemon:
            <input
              id="name"
              autoComplete="off"
              className="block w-half px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
              onChange={pokeQuery}
              placeholder="Enter Pokemon name..."
            />
          </label>
          {showP && (
            <div className="absolute z-10 w-auto mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {pokeList.map((pkmn, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                >
                  <span className="inline-block align-middle">
                    <img src={pkmn.icon} className="w-6 h-6 text-gray-400" />
                  </span>
                  <span className="inline-block align-middle ml-2">
                    {pkmn.name}
                  </span>
                </a>
              ))}
            </div>
          )}
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
