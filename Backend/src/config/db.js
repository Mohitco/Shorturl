import dotenv from "dotenv";
import mongoose from "mongoose";
import mysql from "mysql2/promise";

dotenv.config();



const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};


const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: 'shorturl_users',
  waitForConnections: true,
  connectionLimit: 10
});

export {connectDB,pool};