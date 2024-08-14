import { Schema, model, Document } from 'mongoose';

interface IPokemonEntry {
    name: string;
    moves: string[];
    ev_spread: number[];
    iv_spread: number[];
    item: string;
    ability: string;
    nature: string;
}

interface IPokemonTeam {
    name: string;
    team: IPokemonEntry[];
}

export interface IUserDocument extends Document {
    username: string;
    password: string;
    teams: IPokemonTeam[];
    level: number;
}

const pokemonEntrySchema = new Schema<IPokemonEntry>({
    name: { type: String, required: true },
    moves: { type: [String], required: true },
    ev_spread: { type: [Number], required: true, validate: [(val: number[]) => {return val.length == 6}, '{PATH} exceeds the limit of 6'] },
    iv_spread: { type: [Number], required: true, validate: [(val: number[]) => {return val.length == 6}, '{PATH} exceeds the limit of 6'] },
    item: { type: String, required: true },
    ability: { type: String, required: true },
    nature: { type: String, required: true },
});

const pokemonTeamSchema = new Schema<IPokemonTeam>({
    name: { type: String, required: true },
    team: { type: [pokemonEntrySchema], required: true, validate: [(val: number[]) => {return val.length <= 6}, '{PATH} exceeds the limit of 6'] },
});

const userSchema = new Schema<IUserDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    teams: { type: [pokemonTeamSchema], required: true },
    level: { type: Number, required: true, min: 1 },
});

const User = model<IUserDocument>('user', userSchema);

export default User;
