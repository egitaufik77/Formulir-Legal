import express from "express";
import cors from "cors";
import UserRoute from "../backend/routes/UserRoute.js"


const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.listen(5001, ()=>console.log('Server Running..'))
