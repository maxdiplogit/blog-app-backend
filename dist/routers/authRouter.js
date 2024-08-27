"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Middlewares
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
// Router
const authRouter = express_1.default.Router();
// Controllers
const registerController_1 = __importDefault(require("../controllers/authControllers/registerController"));
const loginController_1 = __importDefault(require("../controllers/authControllers/loginController"));
const logoutController_1 = __importDefault(require("../controllers/authControllers/logoutController"));
authRouter.route('/register')
    .post(registerController_1.default);
authRouter.route('/login')
    .post(loginController_1.default);
authRouter.route('/logout')
    .post(verifyJWT_1.default, logoutController_1.default);
exports.default = authRouter;
