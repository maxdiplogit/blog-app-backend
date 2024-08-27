import { Response, NextFunction } from "express";


const logoutUser = async(req: any, res: Response, next: NextFunction) => {
    // delete accessToken from the frontend

    return res.status(200).json({
        message: "Logged Out Successfully"
    });
};


export default logoutUser;