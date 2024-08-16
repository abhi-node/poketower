import express from 'express'
import { getPokemonData } from './api/getPokemonData';
import { Pokemon } from './types/Pokemon/Pokemon';
import cors from 'cors';
import { getUser, createUser } from './db/retrieve_user'
import { connectDB } from './db/connect'
import { getAllPokemonNames } from './api/getAllPokemonNames';
import { getAllItemNames } from './api/getAllItemNames';
import { Item } from './types/Item/Item';
import { getItemData } from './api/getItemData';

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

interface nameIcon {
    name: string;
    icon: string;
}

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const current_user = await getUser(username, password);
    if (current_user === null) {
        res.status(400).send(new Error('Username or Password incorrect'));
    } else {
        res.json(current_user);
    }
});

app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const current_user = await createUser(username, password);
    res.json(current_user);
});

app.get('/api/pokemon/list', async (req, res) => {
    const retrieved_list = await getAllPokemonNames();
    if (retrieved_list === null) {
        res.status(400).send(new Error('API Error'));
    } else {
        let iconList: string[] = [];
        let retList: nameIcon[] = [];
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        console.log(retrieved_list);
        const nameList = retrieved_list.filter(name => {
            return !(name.toLowerCase().endsWith('mega') || name.toLowerCase().endsWith('gmax'));
        });
        console.log(nameList);
        await Promise.all(nameList.map(async (name) => {
            try {
                const pkmn: Pokemon = await getPokemonData(name) as Pokemon;
                retList.push({ name: name, icon: await pkmn.sprites.front_default } as nameIcon)
                await delay(500);
            } catch (error) {
                console.log(error);
            }
        }));
        console.log(retList);
        res.json({ list: retList });
    }
});

app.get('/api/item/list', async (req, res) => {
    const nameList = await getAllItemNames();
    if (nameList === null) {
        res.status(400).send(new Error('API Error'));
    } else {
        let iconList: string[] = [];
        let retList: nameIcon[] = [];
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        let a = new Set(['medicine', 'held-items', 'choice', 'jewels', 'species-specific', 'plates', 'effort-training']);
        await Promise.all(nameList.map(async (name) => {
            try {
                const item: Item = await getItemData(name) as Item;
                if (a.has(item.category.name)) {
                    retList.push({ name: name, icon: await item.sprites.default } as nameIcon)
                    await delay(500);
                }
            } catch (error) {
                console.log(error);
            }
        }));
        console.log(a);
        res.json({ list: retList });
    }
})

app.listen(port, async () => {
    await connectDB();
});

