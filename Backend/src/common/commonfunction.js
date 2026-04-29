import { pool} from "../config/db.js";
import jwt from "jsonwebtoken";


export const addUser = async (apireference,opts) => {
    let {name,email,password} = opts;
    try{
        const result = await pool.query(`INSERT INTO users (name,email,password) VALUES (?,?,?)`,[name,email,password]);
        return result;
    }
    catch(error){
        return error;
    }
};

export const getUser = async (apiReference, opts) => {
    try {
        let conditions = [];
        let values = [];

        if (opts.access_token) {
            conditions.push("access_token = ?");
            values.push(opts.access_token);
        }

        if (opts.email) {
            conditions.push("email = ?");
            values.push(opts.email);
        }

        if (opts.user_id) {
            conditions.push("id = ?");
            values.push(opts.user_id);
        }

        if (conditions.length === 0) {
            throw new Error("No valid condition provided");
        }

        const query = `SELECT * FROM users WHERE ${conditions.join(" AND ")}`;

        const [rows] = await pool.query(query, values);

        return rows;

    } catch (error) {
        throw error; 
    }
};


export const generate_token = async (apireference, opts) => {
    try {
        let { user_id, email } = opts;

        const token = jwt.sign({ user_id, email },process.env.JWT_SECRET,{ expiresIn: "1h" });

        return token;

    } catch (error) {
        console.error("Token generation error:", error);
        throw error;
    }
};