import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import URL from "../model/url.model.js";
import { pool } from "../config/db.js";
import { addUser, generate_token, getUser } from "../common/commonfunction.js";

const register = async (req, res) => {
    const apiReference = {
        module: 'controller.js',
        apiReference: 'Register'
    };

    try {
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existing = await getUser(apiReference, { email });
        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashpass = await bcrypt.hash(password, 10);

        const result = await addUser(apiReference, {
            name,
            email,
            password: hashpass
        });

        const user_id = result.id;

        const access_token = await generate_token(apiReference, {
            user_id,
            email
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user_id,
                name,
                email,
                access_token
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const login = async (req, res) => {
      const apiReference = {
        module: 'controller.js',
        apiReference: 'Login'
    };

    let {email, password} = req.body;

    try{
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const [verify] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if(verify.length === 0) return res.status(400).json({
            success: false,
            message: "User not found"
        });

        const user = verify;

        const match = await bcrypt.compare(password, user[0].password);
        if(!match) return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });

       const token = await generate_token(apiReference,{
        user_id: user.id,
        email: user.email
       });

       res.cookie("accessToken", token, {
        httpOnly: true,      
        secure: false,        
        sameSite: "Lax",  
        maxAge: 24 * 60 * 60 * 1000 
    });

       return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data:{
            user_id: user.id,
            name: user.name,
            email: user.email,
            token
        }
      });
    }
    catch(error){
        return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    }
}


const getShortUrl = async (req, res) => {
    try {
        const { user_id, longUrl, expireAt } = req.body;
        if (!longUrl) {
            return res.status(400).json({
                message: "longUrl are required"
            });
        }

    if(user_id !== null){
        const [verifyUser] = await pool.query("SELECT * FROM users WHERE id = ?", [user_id]);

        if(verifyUser.length === 0) return res.status(401).json({
            message: "User not found"
        })
        
        const existing = await URL.findOne({ longUrl });

        if (existing) {
            return res.status(200).json({
                message: "URL already shortened",
                shortUrl: `${process.env.BASE_URL}${existing.shortUrl}`
            });
        }

        let shortId;
        let isUnique = false;

        while (!isUnique) {
            shortId = nanoid(5);
            const exists = await URL.findOne({ shortUrl: shortId });
            if (!exists) isUnique = true;
        }

        const newUrl = await URL.create({
            user_id,
            shortUrl: shortId,
            longUrl,
            expireAt
        });

        return res.status(201).json({
            message: "Successfully Created",
            shortUrl: `${process.env.BASE_URL}${newUrl.shortUrl}`
        });
    } else{
        const existing = await URL.findOne({ longUrl });

        if (existing) {
            return res.status(200).json({
                message: "URL already shortened",
                shortUrl: `${process.env.BASE_URL}${existing.shortUrl}`
            });
        }
        let shortId;
        let isUnique = false;

        while (!isUnique) {
            shortId = nanoid(5);
            const exists = await URL.findOne({ shortUrl: shortId });
            if (!exists) isUnique = true;
        }

        const newUrl = await URL.create({
            user_id,
            shortUrl: shortId,
            longUrl,
            expireAt
        });

        return res.status(201).json({
            message: "Successfully Created",
            shortUrl: `${process.env.BASE_URL}${newUrl.shortUrl}`
        });
    }

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const redirectUrl = async (req, res) => {
    try{
        const { shortUrl } = req.params;
        const url = await URL.findOne({ shortUrl });

        if (!url) {
            return res.status(404).json({
                message: "Expired URL Or Invalid URL"
            });
        }

        url.clicks++;
        await url.save();

        return res.redirect(url.longUrl);
    }
    catch(error){ 
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


export {getShortUrl,redirectUrl,register,login};

