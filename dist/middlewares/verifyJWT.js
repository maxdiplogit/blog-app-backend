"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const Post_1 = __importDefault(require("../models/Post"));
// Configure Environment Variables
dotenv_1.default.config();
// Environment Variables
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const verifyJWT = (req, res, next) => {
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
    jsonwebtoken_1.default.verify(accessToken, JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({
                error: "JWT accessToken invalid"
            });
        }
        const posts = await Post_1.default.find({}).exec();
        req.user = {
            id: decoded.userInfo.id,
            username: decoded.userInfo.username,
            email: decoded.userInfo.email,
            posts: posts
        };
        next();
    });
};
exports.default = verifyJWT;
