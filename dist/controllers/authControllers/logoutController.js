"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logoutUser = async (req, res, next) => {
    // delete accessToken from the frontend
    return res.status(200).json({
        message: "Logged Out Successfully"
    });
};
exports.default = logoutUser;
