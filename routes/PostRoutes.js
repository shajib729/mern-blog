const express = require("express")
const router = express.Router();
const {createPost,getPost,fetchPost,updateValidations,editPost,deletePost,allPost,post} = require('../controllers/postController')
const path = require("path");

const imageHandle = (req, res,next)=>{
       
    if (req.files) {
        const file = req.files.image;
        const fileDir = path.join(__dirname, '../my-app/public/images', file.name)

        file.mv(fileDir, err=> {
            if (err) {
                console.error(err);
                res.status(400).json({error:"Fail image"});
                // next()
            } else {
                next()
            }
        })
    } else {
        next()
        // res.status(400).json({error:"Image is required"});
    }
}

const imageEditHandle = (req, res)=>{
       
    if (req.files) {
        const file = req.files.image;
        const fileDir = path.join(__dirname, '../my-app/public/images', file.name)

        file.mv(fileDir, err=> {
            if (err) {
                console.error(err);
                res.status(400).json({error:"Fail image"});
            } else {
                res.status(200).json({message:"Post successfully updated"})
            }
        })
    }
}

router.post('/create_post', createPost, imageHandle);

router.get("/posts/:_id/:page?",getPost)

router.get("/posts",allPost)

router.get("/post/:id", fetchPost)

// router.patch('/edit/:id',updateValidations,editPost,imageEditHandle)
router.patch('/edit/:id',updateValidations, editPost,imageHandle)

router.delete('/delete/:id',deletePost)

router.get('/post/:id',post)

module.exports=router