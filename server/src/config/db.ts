import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/apnasahara';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.warn('Backend running in resilient mode.');
  }
};
