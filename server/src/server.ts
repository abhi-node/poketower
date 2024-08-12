import express from 'express'
import {getPokemonData} from './api/getPokemonData';
import { Pokemon } from './types/Pokemon/Pokemon';
import User from './models/User';
import mongoose from 'mongoose';

async function createUser() {
    try {
        const newUser = new User({
            username: 'AshKetchum',
            teams: [
                {
                    name: 'Pikachu Squad',
                    team: [
                        {
                            name: 'Pikachu',
                            moves: ['Thunderbolt', 'Quick Attack', 'Iron Tail', 'Electro Ball'],
                            ev_spread: [252, 0, 0, 252, 4, 0],
                            iv_spread: [31, 31, 31, 31, 31, 31],
                            item: 'Light Ball',
                            ability: 'Static',
                            nature: 'Jolly',
                        },
                        // Add other Pokémon entries here
                    ],
                },
            ],
            level: 10,
        });

        await newUser.save();
        console.log('User created successfully:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

const app = express();
const port = 3000;


app.listen(port, async () => {
    try {
        await mongoose.connect('mongodb+srv://abhibalagurusamy:ozGor78cw8x6nfoK@cluster0.t4cyr.mongodb.net/');
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
    await createUser();
});

