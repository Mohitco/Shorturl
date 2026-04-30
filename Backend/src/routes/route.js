import express from "express";
import {getShortUrl,redirectUrl,register,login} from "../controller/url.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const route = express.Router();


route.post('/register',register);
route.post('/login',login);
route.post('/shorten',authMiddleware ,getShortUrl);
route.get('/:shortUrl',redirectUrl);




export default route;