const express = require('express');
import {getPokemonData} from './api/getPokemonData';
import { Pokemon } from './types/Pokemon/Pokemon';


const app = express();
const port = 3000;


app.listen(port, async () => {
    const temp = await getPokemonData('ditto') as Pokemon;
    console.log(await temp.moves);
});

