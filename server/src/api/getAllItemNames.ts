import { NamedAPIResource } from "../types/Common/NamedAPIResource";

export interface ItemRequest {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
}

export async function getAllItemNames() {
    const url = 'https://pokeapi.co/api/v2/item?limit=2180';
    try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const itemListJSON: ItemRequest = await response.json() as ItemRequest;
        let itemList: string[] = [];
        itemListJSON.results.forEach((pkmn) => {
          itemList.push(pkmn.name);
        });

        return itemList;
      } catch (error: any) {
        console.error(error.message);
        return null;
      }
}

