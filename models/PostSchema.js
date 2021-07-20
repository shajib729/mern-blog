const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    body:{
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    slug: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    userName: {
        type: String
    }
},
    {timestamps:true}
)
const Post=mongoose.model('Post',postSchema)
module.exports=Post