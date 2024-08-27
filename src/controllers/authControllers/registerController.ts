import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

import UserModel from "../../models/User";


const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    const missingFields: string[] = [];

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
    const duplicate = await UserModel.findOne({ email }).exec();
    if (duplicate) {
        return res.status(409).json({
            error: `User with email: ${ email } already exists. Instead try logging in.`
        });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and store the new user
    const newUser = new UserModel({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({
        "message": "New user created successfully"
    });
};


export default registerUser;