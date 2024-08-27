import { Response, NextFunction } from "express";

// Models
import UserModel from "../../models/User";
import PostModel from "../../models/Post";


const createPost = async(req: any, res: Response, next: NextFunction) => {
    const { postTitle, postContent } = req.body;
    const { id: userId } = req.user;

    // Check if the post with the same title already exists
    // If it does, then ask the user to rather delete/update it
    const duplicatePost = await PostModel.findOne({ _id: userId, postTitle: postTitle }).exec();

    if (duplicatePost) {
        return res.status(409).json({
            message: "Post with the same title already exists, instead try updating/deleting it."
        });
    }

    const newPost = new PostModel({ user: userId, postTitle: postTitle, postContent: postContent });
    await newPost.save();

    const posts = await PostModel.find({}).populate('user', '_id username email').exec();

    return res.status(201).json({
        newPost,
        allPosts: posts
    });
};


export default createPost;