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
const User_1 = __importDefault(require("./models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = new User_1.default({
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
            yield newUser.save();
            console.log('User created successfully:', newUser);
        }
        catch (error) {
            console.error('Error creating user:', error);
        }
    });
}
const app = (0, express_1.default)();
const port = 3000;
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb+srv://abhibalagurusamy:ozGor78cw8x6nfoK@cluster0.t4cyr.mongodb.net/');
        console.log('MongoDB connected successfully.');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
    yield createUser();
}));
