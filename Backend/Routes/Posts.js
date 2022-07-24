
import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../Controllers/posts.js';
import auth from '../Middleware/auth.js';

const router = express.Router();

router.get('/', getPosts)
router.post('/', auth ,createPost);
router.patch('/:id', auth ,updatePost);
router.delete('/:id', auth ,deletePost);
router.patch('/:id/likePost', auth ,likePost)

export default router;

// here even if user is not login stil he or she can see post but to create,delete,edt or like any post he or she have to first go through auth middleware and can perform operation on only their post not on others post 