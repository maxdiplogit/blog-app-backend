"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../models/Post"));
const updatePost = async (req, res, next) => {
    const { postId, postTitle, postContent } = req.body;
    const { id: userId } = req.user;
    try {
        // Check if the post exists
        const post = await Post_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: `${postId} does not exist`
            });
        }
        // Check if the post is owned by the user logged in or not
        if (post.user?.toString() !== userId) {
            return res.status(403).json({
                message: `${postId} is not owned by ${userId}`
            });
        }
        post.postTitle = postTitle;
        post.postContent = postContent;
        const updatedPost = await post.save();
        const posts = await Post_1.default.find({}).populate('user', '_id username email').exec();
        return res.status(201).json({
            updatedPost,
            allPosts: posts
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: `Failed to update post: ${error}`
        });
    }
};
exports.default = updatePost;
