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
const cors_1 = __importDefault(require("cors"));
const User_1 = __importDefault(require("./models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const getUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            console.log('User not found');
            return null;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (isMatch) {
            console.log('Authentication successful:', user);
            return user;
        }
        else {
            console.log('Invalid password');
            return null;
        }
    }
    catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
});
const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            username: username,
            password: hashedPassword,
            teams: [],
            level: 1,
        });
        yield newUser.save();
        console.log('User created successfully:', newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
    }
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb+srv://abhibalagurusamy:ozGor78cw8x6nfoK@cluster0.t4cyr.mongodb.net/');
        console.log('MongoDB connected successfully.');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
});
const port = 3000;
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    const current_user = yield getUser(username, password);
    if (current_user === null) {
        res.status(400).send(new Error('Username or Password incorrect'));
    }
    else {
        res.json(current_user);
    }
}));
app.post('/api/signup', (req, res) => {
});
app.get('/api/retrieve', (req, res) => {
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(port);
    yield connectDB();
}));
