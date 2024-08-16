import { useEffect, useState } from 'react'

function PokemonBuilder(props) {
  const [pokeList, setPokeList] = useState([]);
  const [showP, setShowP] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [currPkmn, setCurrPKMN] = useState("");
  const [pkmnFocused, setPkmnFocused] = useState(false);
  const [sentFetch, setSentFetch] = useState(false);

  const comparePkmn = (a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    const storedPKMNList = localStorage.getItem('full-pkmn-list');
    if (storedPKMNList) {
      setPokeList(JSON.parse(storedPKMNList).list.sort(comparePkmn));
      setFilteredList(pokeList);
    }
    setSentFetch(true);
  }, []);

  useEffect(() => {
    if (sentFetch && pokeList.length === 0) {
      fetchList();
    }
  }, [sentFetch]);

  useEffect(() => {
    if (currPkmn !== "") {
      const filtered = pokeList.filter(pkmn =>
        pkmn.name.toLowerCase().startsWith(currPkmn.toLowerCase())
      );
      setFilteredList(filtered);
    } else {
      setFilteredList(pokeList);
    }
  }, [currPkmn]);

  const fetchList = async () => {
    const response = await fetch('/api/pokemon/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    const jsonPromise = await response.json();

    if (response.ok) {
      console.log(await jsonPromise);
      setPokeList(jsonPromise.list.sort(comparePkmn));
      setFilteredList(pokeList);
      localStorage.setItem('full-pkmn-list', JSON.stringify(jsonPromise));
    } else {
      console.log('Error with getting list');
    }
  }

  const select_pkmn = (event) => {
    event.preventDefault();
    setCurrPKMN(event.target.textContent);
  }

  const pkmnSetter = async (event) => {
    setCurrPKMN(event.target.value);
  }

  const handlePkmnFocus = () => {
    if (!pkmnFocused) {
      setPkmnFocused(true);
      setShowP(true);
    }
  }

  const handlePkmnBlur = () => {
    setTimeout(() => {
      if (pkmnFocused) {
        setPkmnFocused(false);
        setShowP(false);
      }
    }, 150) ;
  }
  return (
    <>
        <div className="relative group">
          <label htmlFor="name" className="form-label">
            Pokemon:
            <input
              id="name"
              autoComplete="off"
              className="block w-half px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
              onChange={pkmnSetter}
              onFocus={handlePkmnFocus}
              onBlur={handlePkmnBlur}
              value={currPkmn}
              placeholder="Enter Pokemon name..."
            />
          </label>
          {showP && (
            <div className="absolute z-10 w-auto mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredList.map((pkmn, index) => (
                <a
                  key={index}
                  onClick={select_pkmn}
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
    </>
  );
}

export default PokemonBuilder
