"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pokemonEntrySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    moves: { type: [String], required: true },
    ev_spread: { type: [Number], required: true, validate: [(val) => { return val.length == 6; }, '{PATH} exceeds the limit of 6'] },
    iv_spread: { type: [Number], required: true, validate: [(val) => { return val.length == 6; }, '{PATH} exceeds the limit of 6'] },
    item: { type: String, required: true },
    ability: { type: String, required: true },
    nature: { type: String, required: true },
});
const pokemonTeamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    team: { type: [pokemonEntrySchema], required: true, validate: [(val) => { return val.length <= 6; }, '{PATH} exceeds the limit of 6'] },
});
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    teams: { type: [pokemonTeamSchema], required: true },
    level: { type: Number, required: true, min: 1 },
});
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;
