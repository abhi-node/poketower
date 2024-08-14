import express from 'express'
import {getPokemonData} from './api/getPokemonData';
import { Pokemon } from './types/Pokemon/Pokemon';
import cors from 'cors';
import User from './models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());
app.use(cors());

const getUser = async (username: string, password: string) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log('Authentication successful:', user);
            return user;
        } else {
            console.log('Invalid password');
            return null;
        }

    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}

const createUser = async (username: string, password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            password: hashedPassword,
            teams: [],
            level: 1,
        });

        await newUser.save();
        console.log('User created successfully:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://abhibalagurusamy:ozGor78cw8x6nfoK@cluster0.t4cyr.mongodb.net/');
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}

const port = 3000;

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

app.get('/api/retrieve', (req, res) => {

});

app.listen(port, async () => {
    console.log(port);
    await connectDB();
});

