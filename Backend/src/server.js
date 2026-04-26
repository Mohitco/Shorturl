import express from "express";
import route from "./routes/route.js";
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api',route);

app.get('/',(req,res) => {
    res.send("helooo");
})

export default app;
