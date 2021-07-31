const express = require("express")
const router = express.Router();
const {createPost,getPost,fetchPost,updateValidations,editPost,deletePost,allPost,post} = require('../controllers/postController')
const path = require("path");

// const imageHandle = (req, res,next)=>{
       
//     if (req.files) {
//         const file = req.files.image;
//         const fileDir = path.join(__dirname, '../my-app/public/images', file.name)

//         file.mv(fileDir, err=> {
//             if (err) {
//                 console.error(err);
//                 res.status(400).json({error:"Fail image"});
//                 // next()
//             } else {
//                 next()
//             }
//         })
//     } else {
//         next()
//     }
// }

router.post('/create_post', createPost);

router.get("/posts/:_id/:page?",getPost)

router.get("/posts",allPost)

router.get("/post/:id", fetchPost)

router.patch('/edit/:id',updateValidations, editPost)

router.delete('/delete/:id',deletePost)

router.get('/post/:id',post)

module.exports=router