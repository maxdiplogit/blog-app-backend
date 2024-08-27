"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Middlewares
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
// Router
const postRouter = express_1.default.Router();
// Controllers
const createPostController_1 = __importDefault(require("../controllers/postControllers/createPostController"));
const updatePostController_1 = __importDefault(require("../controllers/postControllers/updatePostController"));
const deletePostController_1 = __importDefault(require("../controllers/postControllers/deletePostController"));
const getPostController_1 = __importDefault(require("../controllers/postControllers/getPostController"));
const getPostsController_1 = __importDefault(require("../controllers/postControllers/getPostsController"));
postRouter.route('/create')
    .post(verifyJWT_1.default, createPostController_1.default);
postRouter.route('/update')
    .put(verifyJWT_1.default, updatePostController_1.default);
postRouter.route('/delete')
    .delete(verifyJWT_1.default, deletePostController_1.default);
postRouter.route('/getPost/:postId')
    .get(verifyJWT_1.default, getPostController_1.default);
postRouter.route('/getPosts')
    .get(verifyJWT_1.default, getPostsController_1.default);
exports.default = postRouter;
