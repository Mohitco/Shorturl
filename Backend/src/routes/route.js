import express from "express";
import {getShortUrl,redirectUrl} from "../controller/url.controller.js";

const route = express.Router();



route.post('/shorten',getShortUrl);
route.get('/:shortUrl',redirectUrl);




export default route;