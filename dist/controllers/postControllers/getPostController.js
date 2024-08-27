"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const Post_1 = __importDefault(require("../../models/Post"));
const getPost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await Post_1.default.findById(postId).populate('user', '_id username email').exec();
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }
        return res.status(200).json(post);
    }
    catch (error) {
        return res.status(500).json({
            message: 'Failed to retrieve post', error
        });
    }
};
exports.default = getPost;
