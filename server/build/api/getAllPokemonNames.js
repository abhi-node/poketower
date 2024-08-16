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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPokemonNames = getAllPokemonNames;
function getAllPokemonNames() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=1302';
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const pokeListJSON = yield response.json();
            let pokeList = [];
            pokeListJSON.results.forEach((pkmn) => {
                pokeList.push(pkmn.name);
            });
            console.log(pokeList);
            return pokeList;
        }
        catch (error) {
            console.error(error.message);
            return null;
        }
    });
}
