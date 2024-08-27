"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../models/User"));
const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    const missingFields = [];
    if (username === "") {
        missingFields.push("username");
    }
    if (email === "") {
        missingFields.push("email");
    }
    if (password === "") {
        missingFields.push("password");
    }
    if (missingFields.length > 0) {
        return res.status(400).json({
            missingFields: missingFields,
        });
    }
    // Check for duplicate users
    const duplicate = await User_1.default.findOne({ email }).exec();
    if (duplicate) {
        return res.status(409).json({
            error: `User with email: ${email} already exists. Instead try logging in.`
        });
    }
    // Encrypt password
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    // Create and store the new user
    const newUser = new User_1.default({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({
        "message": "New user created successfully"
    });
};
exports.default = registerUser;
