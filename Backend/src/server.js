import express from "express";
import route from "./routes/route.js";
import rateLimit from "express-rate-limit";
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50,
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});


app.use(limiter);

app.use('/api',route);

app.get('/',(req,res) => {
    res.send("helooo");
})

export default app;
