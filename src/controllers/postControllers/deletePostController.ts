import { Response, NextFunction } from "express";

// Models
import UserModel from "../../models/User";
import PostModel from "../../models/Post";


const deletePost = async(req: any, res: Response, next: NextFunction) => {
    const { postId } = req.body;
    const { id: userId } = req.user;

    try {
         // Check if the post exists
        const post = await PostModel.findById(postId).exec();

        if (!post) {
            return res.status(404).json({
                message: `${ postId } does not exist`
            });
        }

        // Check if the post is owned by the user logged in or not
        if (post.user?.toString() !== userId) {
            return res.status(403).json({
                message: `${ postId } is not owned by ${ userId }`
            });
        }

        await PostModel.findByIdAndDelete(postId).exec();

        const posts = await PostModel.find({}).populate('user', '_id username email').exec();

        return res.status(201).json({
            message: "Post deleted successfully",
            allPosts: posts
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: `Failed to delete post: ${ error }`
        });
    }
};


export default deletePost;