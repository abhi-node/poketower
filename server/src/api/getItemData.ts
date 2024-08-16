import { Item } from "../types/Item/Item";

export async function getItemData(item: string) {
    const url = 'https://pokeapi.co/api/v2/item/'.concat(item.toLowerCase());
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        

        const itemJSON: Item | unknown = await response.json() as Item;

        return itemJSON;
      } catch (error: any) {
        console.error(error.message);
      }
}