import { NamedAPIResource } from "../types/Common/NamedAPIResource";

export interface PokemonRequest {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
}

export async function getAllPokemonNames() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1302';
    try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const pokeListJSON: PokemonRequest = await response.json() as PokemonRequest;
        let pokeList: string[] = [];
        pokeListJSON.results.forEach((pkmn) => {
          pokeList.push(pkmn.name);
        });

        console.log(pokeList);
        return pokeList;
      } catch (error: any) {
        console.error(error.message);
        return null;
      }
}

