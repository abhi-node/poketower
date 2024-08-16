"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getPokemonData_1 = require("./api/getPokemonData");
const cors_1 = __importDefault(require("cors"));
const retrieve_user_1 = require("./db/retrieve_user");
const connect_1 = require("./db/connect");
const getAllPokemonNames_1 = require("./api/getAllPokemonNames");
const getAllItemNames_1 = require("./api/getAllItemNames");
const getItemData_1 = require("./api/getItemData");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = 3000;
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    const current_user = yield (0, retrieve_user_1.getUser)(username, password);
    if (current_user === null) {
        res.status(400).send(new Error('Username or Password incorrect'));
    }
    else {
        res.json(current_user);
    }
}));
app.post('/api/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    const current_user = yield (0, retrieve_user_1.createUser)(username, password);
    res.json(current_user);
}));
app.get('/api/pokemon/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const retrieved_list = yield (0, getAllPokemonNames_1.getAllPokemonNames)();
    if (retrieved_list === null) {
        res.status(400).send(new Error('API Error'));
    }
    else {
        let iconList = [];
        let retList = [];
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        console.log(retrieved_list);
        const nameList = retrieved_list.filter(name => {
            return !(name.toLowerCase().endsWith('mega') || name.toLowerCase().endsWith('gmax'));
        });
        console.log(nameList);
        yield Promise.all(nameList.map((name) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const pkmn = yield (0, getPokemonData_1.getPokemonData)(name);
                retList.push({ name: name, icon: yield pkmn.sprites.front_default });
                yield delay(500);
            }
            catch (error) {
                console.log(error);
            }
        })));
        console.log(retList);
        res.json({ list: retList });
    }
}));
app.get('/api/item/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nameList = yield (0, getAllItemNames_1.getAllItemNames)();
    if (nameList === null) {
        res.status(400).send(new Error('API Error'));
    }
    else {
        let iconList = [];
        let retList = [];
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        let a = new Set(['medicine', 'held-items', 'choice', 'jewels', 'species-specific', 'plates', 'effort-training']);
        yield Promise.all(nameList.map((name) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const item = yield (0, getItemData_1.getItemData)(name);
                if (a.has(item.category.name)) {
                    retList.push({ name: name, icon: yield item.sprites.default });
                    yield delay(500);
                }
            }
            catch (error) {
                console.log(error);
            }
        })));
        console.log(a);
        res.json({ list: retList });
    }
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.connectDB)();
}));
