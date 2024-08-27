import express from 'express';

// Middlewares
import verifyJWT from '../middlewares/verifyJWT';


// Router
const postRouter = express.Router();


// Controllers
import createPost from '../controllers/postControllers/createPostController';
import updatePost from '../controllers/postControllers/updatePostController';
import deletePost from '../controllers/postControllers/deletePostController';
import getPost from '../controllers/postControllers/getPostController';
import getPosts from '../controllers/postControllers/getPostsController';


postRouter.route('/create')
    .post(verifyJWT, createPost);

postRouter.route('/update')
    .put(verifyJWT, updatePost);

postRouter.route('/delete')
    .delete(verifyJWT, deletePost);

postRouter.route('/getPost/:postId')
    .get(verifyJWT, getPost);

postRouter.route('/getPosts')
    .get(verifyJWT, getPosts);


export default postRouter;