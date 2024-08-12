export async function getMoveData(move: string) {
    const url = 'https://pokeapi.co/api/v2/move/'.concat(move.toLowerCase());
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json);
      } catch (error: any) {
        console.error(error.message);
      }
}