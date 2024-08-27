import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";

// Routers
import authRouter from './routers/authRouter';
import postRouter from './routers/postRouter';


// Load environment variables from .env file
dotenv.config();
// Environment Variables
const PORT: string = process.env.PORT || "";
const MONGO_DB_URL: string = process.env.MONGO_DB_URL || "";
const FRONT_URL: string = process.env.FRONT_URL || "";

console.log("IDHAR DEKH: ", FRONT_URL);



// Connecting to MongoDB Database
mongoose.connect(MONGO_DB_URL)
    .then(() => {
        console.log("MongoDB Connection Success");
    })
    .catch((err) => {
        console.log(err.message);
    });


// Express Application
const app = express();


// Middlewares
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(
    cors({
        origin: FRONT_URL,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
app.use('/auth', authRouter);
app.use('/post', postRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Blog App Backend");
});


// Start the server
app.listen(PORT, () => {
    console.log(`Serving running on PORT ${ PORT } ...`);
});