const Post = require('../models/postModel')

const createPost = async(req, res) => {
    const {title, content, author, tags} = req.body
    const post = new Post({title, content, author, tags})
    try{
        await post.save()
        res.status(200).json({ message: 'Post created successfully' })
    }catch(error){
        return res.status(400).json({ error: error.message })
    }
}

const findPostByUser = async(req, res) => {
    const {id} = req.params
    console.log('user id: ',id)
    try{
        const blogs = await Post.find({ author: id }).populate('author');
        res.status(200).json({ blogs: blogs })
    }catch(error){
        return res.status(400).json({ error: error.message })
    }

}

const getAllPosts = async(req, res) => {
    try{
        const blogs = await Post.find()
        res.status(200).json({ blogs: blogs })
    }catch(error){
        return res.status(400).json({ error: error.message })
    }

}

const getPost = async(req, res) => {
    try{
        const blogs = await Post.findById(req.params.id).populate('author');
        res.status(200).json({ blogs: blogs })
    }catch(error){
        return res.status(400).json({ error: error.message })
    }
}

const updatePost = async(req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).send();
        }
        res.status(200).send(post);
    }catch(error){
        res.status(400).send(error);
    }
}

const deletePost = async(req, res) => {
    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        res.status(200).send(post);
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    createPost,
    findPostByUser,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
}
