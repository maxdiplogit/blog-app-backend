import { Response, NextFunction } from "express";

// Models
import PostModel from "../../models/Post";


const getPost = async(req: any, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    try {
        const post = await PostModel.findById(postId).populate('user', '_id username email').exec();

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to retrieve post', error
        });
    }
};


export default getPost;