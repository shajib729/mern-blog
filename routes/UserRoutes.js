const express = require("express")
const app = express()
const router = express.Router()
const path=require('path')
//Register Route from userControllers
const { register, registerValidations, login, loginValidations, update, sendData,users,user } = require("../controllers/userControllers")


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



router.post('/register',registerValidations,register)

router.post('/login',loginValidations,login)

router.get('/getUser/:id', sendData)

router.get('/users', users)

router.get('/user/:userName', user)

router.patch('/editUser/:id', update,imageHandle)

module.exports= router