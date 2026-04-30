import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        if(req.body.user_id){
             const token = req.cookies.accessToken;

             if(!token) return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;

            req.body.expireAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

        }
        else {

            req.body.user_id = null;

            req.body.expireAt = new Date(Date.now() + 3 * 1000);
        }

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
            error: err.message
        })
    }
};