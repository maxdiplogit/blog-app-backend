import { Request, Response, NextFunction } from "express";

// Models
import UserModel from "../../models/User";
import PostModel from "../../models/Post";


const getPosts = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await PostModel.find().populate('user', '_id username email').exec();
        
        return res.status(200).json({
            allPosts: posts
        });
    } catch (error) {
        return res.status(500).json({
            message: `Failed to retrieve posts: ${ error }`
        });
    }
};


export default getPosts;