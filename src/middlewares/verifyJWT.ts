import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import PostModel from '../models/Post';

// Configure Environment Variables
dotenv.config();
// Environment Variables
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";


const verifyJWT = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'JWT accessToken missing from request headers' });
    }

    const accessToken = authHeader.split(' ')[1];

    if (accessToken === "") {
        return res.status(401).json({
            error: "JWT accessToken not provided"
        });
    }

    jwt.verify(
        accessToken,
        JWT_SECRET_KEY,
        async (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({
                    error: "JWT accessToken invalid"
                });
            }

            const posts = await PostModel.find({}).exec();

            req.user = {
                id: decoded.userInfo.id,
                username: decoded.userInfo.username,
                email: decoded.userInfo.email,
                posts: posts
            };
            next();
        }
    );
};


export default verifyJWT;