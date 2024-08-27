"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../models/Post"));
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post_1.default.find().populate('user', '_id username email').exec();
        return res.status(200).json({
            allPosts: posts
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `Failed to retrieve posts: ${error}`
        });
    }
};
exports.default = getPosts;
