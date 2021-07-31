const formidable = require('formidable')
const {uuid} = require('uuidv4')
const fs = require("fs")
const path=require('path')
const Post = require('../models/PostSchema')
const User = require('../models/Schema')
const { body, validationResult } = require("express-validator")
const { htmlToText } = require('html-to-text');

const createPost =async (req, res,next) => {
    // console.log(req.files);
    const { title, body, description, slug, id, name,image } = req.body;

    if ( title && body && description && slug &&image) {
        
        const newPost = await Post.create({ title, body, image: image, description, slug, userId: id, userName: name })
        if (newPost) {
            res.status(200).json({ message: "Post successfully created" })
        } else {
            res.status(400).json({ message: "Fail to create Post" })
        }
        
        // const { mimetype } = req.body.image
        // const extension = mimetype.split('/')[1]
        // // console.log(extension);

        // if (extension == 'jpg' || extension == 'jpeg' || extension == 'png') {
        //     // res.status(200).json({ message: "Post successfully created" })            
        //     try {
        //         const checkSlug = await Post.findOne({ slug })
        //         const userData=await User.findOne({_id:id})
        //         // console.log(userData);
        //         if (checkSlug) {
        //             res.status(400).json({error:"Post url should be unique"})
        //         } else if(userData) {
        //             // console.log(title, body, req.files.image.name , description, slug);
        //             const newPost = await Post.create({title, body, image:req.files.image.name, description, slug,userId:id,userName:name})
        //             // console.log(newPost);
        //             res.status(200).json({ message: "Post successfully created" })
        //             next()
        //         } else {
        //             res.status(400).json({ error:"Login First"})
        //         }
        //     }catch (err) {
        //             console.log('error  ',err);
        //             res.status(400).json(err.message)
        //         }
        // }else {
        //     res.status(400).json({error:`${extension} is not accepted extension`})
        // }
    } else {
        
        if (!title) {
            res.status(400).json({error:"Title is required"})
        }
        if (!body) {
            res.status(400).json({error:"Body is required"})
        }
        if (!description) {
            res.status(400).json({error:"Description is required"})
        }
        if (!slug) {
            res.status(400).json({error:"Slug is required"})
        }
        if (!image) {
            res.status(400).json({error:"Post Image is required"})
        }
    }

}

// get all post to show in home page
const allPost = async (req, res) => {
    const posts = await Post.find()
    res.status(200).json({message:posts})
}

// get user post in dashboard 
const getPost =async (req, res) => {
    // console.log(req.params);
    const id = req.params._id
    const page = req.params.page
    const perPage = 2
    const skip = (page - 1) * perPage
        
    if (id) {
        try {
            const userData = await Post.find({ userId: id })
            // console.log(userData);
            let count=userData.length;
            res.status(200).json({message:userData,page,perPage,skip,count})
        } catch (err) {
            res.status(500).json({error:err.message})
        }
    } else {
        res.status(400).json({error:"User did not found"})
    }
}

// fetch post to edit 
const fetchPost =async (req, res) => {
    const id = req.params.id
    // console.log(id);
    try {
        if (id) {
            const post = await Post.findOne({ _id: id })
            // console.log(post);
            res.status(200).json({message:post})
        
        } else {
            res.status(400).json({error:"Login First to edit post"})
        }
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}


// formatter of custom error
const formatter = (error) => error.msg

// validate editing post 
const updateValidations = [
    body('title').notEmpty().trim().withMessage("Title is required"),
    body('body').notEmpty().trim().custom(value => {
        // let bodyValue = value.replace(/\n/g, '');
        if (htmlToText(value).trim().length === 0){
            return false
        }else{
            return true;
        }
    }).withMessage("Body is required"),
    body('description').notEmpty().trim().withMessage("Description is required")
]

// edit post 
const editPost =async (req, res,next) => {
    // console.log(req.files)
    // console.log(req.body)
    const { title, body, description, imageUrl } = req.body
    // console.log(imageUrl);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.formatWith(formatter).mapped() })
        console.log(errors.formatWith(formatter).mapped());
    } else {
        try {
            
            if (req.files) {
                const updateImage = await Post.findByIdAndUpdate({ _id: req.params.id }, {image:imageUrl})
                if (updateImage) {
                    // console.log(updateImage);
                    res.status(200).json({ message: "Post is succesfully updated" })
                    next()
                }
            }
            
            const updateData = await Post.findByIdAndUpdate({ _id: req.params.id }, { title, body, description})
            if (updateData) {
                // console.log(updateData);
                res.status(200).json({ message: "Post is succesfully updated" })
            }

        } catch (err) {
            console.log(err.message)
            res.status(400).json({error:err.message})
        }
    }
}

// delete post 
const deletePost =async (req, res) => {
    // console.log(req.params)
    try {
        const postId = req.params.id
        if (postId) {
            const deletedPost = await Post.findByIdAndDelete({ _id: postId })
            if (deletedPost) {
                res.status(200).json({message:"Post is deleted successfully."})
            } else {
                res.status(400).json({error:"Fail to delete post"})
            }
        } else {
            res.status(400).json({error:"Post is not found"})
        }
    } catch (err) {
        res.status(400).jsoN({error:err.message})
    }
}

// fetch post to show in post page 
const post =async (req, res) => {
    const id = req.params.id
    // console.log(id);

    try {
        if (id) {
    
            const post = await Post.findOne({_id:id })
            // console.log(post);
            res.status(200).json({message:post})
        
        } else {
            res.status(400).json({error:"Something is wrong"})
        }
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

    
module.exports = {createPost,getPost,fetchPost,updateValidations,editPost,deletePost,allPost,post}