const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title:{
        type: String,
        required:[true, 'title is required'],
    },
    content:{
        type: String,
        required:[true, 'title is required'],
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:[true, 'author is required'],
    },
    tags:[String],
    isPublished:{type:Boolean, default: false}
}, {timestamps:true})

const Post = mongoose.model('Post', postSchema)
module.exports = Post