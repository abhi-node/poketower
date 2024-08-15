import User from "../models/User";
import bcrypt from 'bcrypt';

export const getUser = async (username: string, password: string) => {
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

export const createUser = async (username: string, password: string) => {
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