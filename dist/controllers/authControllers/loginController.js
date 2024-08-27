"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Models
const Post_1 = __importDefault(require("../../models/Post"));
const User_1 = __importDefault(require("../../models/User"));
// Configure Environment Variables
dotenv_1.default.config();
// Environment Variables
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await User_1.default.findOne({ email }).exec();
    // If user does not exist
    if (!foundUser) {
        return res.status(401).json({
            emailNonExistent: `${email} doesn't exist`,
        });
    }
    const match = await bcrypt_1.default.compare(password, foundUser.password);
    // If passwords match
    if (match) {
        // Generate access token for user
        const accessToken = jsonwebtoken_1.default.sign({
            userInfo: {
                id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email,
            }
        }, JWT_SECRET_KEY, {
            expiresIn: '10m'
        });
        const posts = await Post_1.default.find({}).populate('user', '_id username email').exec();
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
exports.default = loginUser;
