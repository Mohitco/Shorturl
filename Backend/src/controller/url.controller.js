import { nanoid } from "nanoid";
import URL from "../model/url.model.js";


const getShortUrl = async (req, res) => {
    try {
        const { userid, longUrl } = req.body;

        if (!userid || !longUrl) {
            return res.status(400).json({
                message: "Userid and longUrl are required"
            });
        }

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
            userid,
            shortUrl: shortId,
            longUrl
        });

        return res.status(201).json({
            message: "Successfully Created",
            shortUrl: `${process.env.BASE_URL}${newUrl.shortUrl}`
        });

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
                message: "URL not found"
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


export {getShortUrl,redirectUrl};

