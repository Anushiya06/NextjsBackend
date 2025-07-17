import mongoose from "mongoose";

const Mongodb_url = process.env.Mongodb_url;
if (!Mongodb_url) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(Mongodb_url, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;