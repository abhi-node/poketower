import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://abhibalagurusamy:ozGor78cw8x6nfoK@cluster0.t4cyr.mongodb.net/');
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}