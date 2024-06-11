const express = require('express');
const router = express.Router()
const {createPost,findPostByUser,getAllPosts, updatePost,deletePost} = require('../controllers/postController')

router.post('/createPost', createPost)
router.get('/post/:id', findPostByUser)
router.get('/posts', getAllPosts)
router.patch('/post/:id', updatePost)
router.delete('/post/:id', deletePost)

module.exports = router