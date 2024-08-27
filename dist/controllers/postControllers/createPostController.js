"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../models/Post"));
const createPost = async (req, res, next) => {
    const { postTitle, postContent } = req.body;
    const { id: userId } = req.user;
    // Check if the post with the same title already exists
    // If it does, then ask the user to rather delete/update it
    const duplicatePost = await Post_1.default.findOne({ _id: userId, postTitle: postTitle }).exec();
    if (duplicatePost) {
        return res.status(409).json({
            message: "Post with the same title already exists, instead try updating/deleting it."
        });
    }
    const newPost = new Post_1.default({ user: userId, postTitle: postTitle, postContent: postContent });
    await newPost.save();
    const posts = await Post_1.default.find({}).populate('user', '_id username email').exec();
    return res.status(201).json({
        newPost,
        allPosts: posts
    });
};
exports.default = createPost;
