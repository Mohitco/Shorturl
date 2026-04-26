import connectDB from './src/config/db.js';
import app from './src/server.js';
import dotenv from "dotenv";
dotenv.config();


connectDB()


const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server Running at http://localhost:${PORT}`)
})