import express from 'express'
import {getPokemonData} from './api/getPokemonData';
import { Pokemon } from './types/Pokemon/Pokemon';
import cors from 'cors';
import { getUser, createUser } from './db/retrieve_user'
import { connectDB } from './db/connect'
import { getAllPokemonNames } from './api/getAllPokemonNames';

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

interface nameIcon {
    name: string;
    icon: string;
}

app.post('/api/login', async(req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    const current_user = await getUser(username, password);
    if (current_user === null) {
        res.status(400).send(new Error('Username or Password incorrect'));
    } else {
        res.json(current_user);
    }
});

app.post('/api/signup', async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    const current_user = await createUser(username, password);
    res.json(current_user);
});

app.get('/api/pokemon/list', async (req, res) => {
    const nameList = await getAllPokemonNames();
    if (nameList === null) {
        res.status(400).send(new Error('API Error'));
    } else {
        let iconList: string[] = [];
        let retList: nameIcon[] = [];
        await Promise.all(nameList.map(async (name) => {
            const pkmn: Pokemon = await getPokemonData(name) as Pokemon;
            console.log(pkmn.sprites.front_default);
            retList.push({name: name, icon: await pkmn.sprites.front_default} as nameIcon)
        }));
        console.log(retList);
        res.json({list: retList});
    }
});

app.listen(port, async () => {
    await connectDB();
});

