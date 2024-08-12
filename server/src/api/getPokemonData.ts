import { Pokemon } from "../types/Pokemon/Pokemon";

export async function getPokemonData(pokemon: string) {
    const url = 'https://pokeapi.co/api/v2/pokemon/'.concat(pokemon.toLowerCase());
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const pokemonJSON: Pokemon | unknown = await response.json() as Pokemon;

        console.log(pokemonJSON);
        return pokemonJSON;
      } catch (error: any) {
        console.error(error.message);
      }
}

