import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

// Models
import PostModel from '../../models/Post';
import UserModel from '../../models/User';

// Configure Environment Variables
dotenv.config();
// Environment Variables
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";


const loginUser = async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email }).exec();

    // If user does not exist
    if (!foundUser) {
        return res.status(401).json({
            emailNonExistent: `${ email } doesn't exist`,
        });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    // If passwords match
    if (match) {
        // Generate access token for user
        const accessToken = jwt.sign({
            userInfo: {
                id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email,
            }
        }, JWT_SECRET_KEY, {
            expiresIn: '10m'
        });

        const posts = await PostModel.find({}).populate('user', '_id username email').exec();

        return res.status(200).json({
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            accessToken: accessToken,
            allPosts: posts,
        });
    }

    return res.status(401).json({
        incorrectPassword: `Incorrect password`
    });
};


export default loginUser;