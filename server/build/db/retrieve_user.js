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
exports.createUser = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
exports.getUser = getUser;
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
        return newUser;
    }
    catch (error) {
        console.error('Error creating user:', error);
    }
});
exports.createUser = createUser;
