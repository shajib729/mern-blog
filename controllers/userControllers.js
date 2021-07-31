require("dotenv").config()
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/Schema")
const Post = require("../models/PostSchema")

// token gen 
let genToken = (user) => {
     return jwt.sign({user}, process.env.SECRET_KEY, {
        expiresIn:'7d'
    })
}

// formatter of custom error
const formatter = (error) => error.msg
    
// Resgistration validtion
const registerValidations = [
    body("name").not().isEmpty().trim().withMessage("Name is required"),
    body("userName").not().isEmpty().trim().withMessage("User Name is required"),
    body("email").not().isEmpty().trim().withMessage("Email is required").isEmail().withMessage("Not a valid Email"),
    body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 character"),
    body("cpassword").custom((value,{ req }) => {
        if (value !== req.body.password) {
            throw new Error("Confirm Password doesn't match")
        }
        return true
    })
];

// Resgistration route
const register = async (req, res) => {
    const {name,email}=req.body
    console.log(name,email);
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.formatWith(formatter).mapped() })
        // console.log(errors.formatWith(formatter).mapped());
    } else if (!req.body.cpassword) {
        console.log("Cpassword not");
    } else {
        try {
            const checkUser =await User.findOne({ email: req.body.email })
            const checkUserName =await User.findOne({ userName: req.body.userName })
            if (checkUser) {
                return res.status(400).json({error:"Email is already exist"})
            } else if (checkUserName) {
                return res.status(400).json({error:"User Name is exist, It must be unique"})
            } else {
                //Hash password
                const salt=await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(req.body.password, salt);
                try {
                    const user =await User.create({
                        name:req.body.name,
                        userName:req.body.userName,
                        email:req.body.email,
                        password: hash
                    })
                    const token=genToken(user)
                    return res.status(200).json({message:"User created successfully",token})
                } catch (err) {
                    return res.status(500).json({error:"Server Error"})
                }
            }
    
        } catch (err) {
            return res.status(500).json({error:"Server Error"})
        }
    }
}

// login validtion
const loginValidations = [
    body("email").isEmail().withMessage("Not a valid Email").not().isEmpty().trim().withMessage("Email is required"),
    body("password").not().isEmpty().trim().withMessage("Password is required")
];

// login route
const login = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.formatWith(formatter).mapped()})
    } else {
        try {
            const user = await User.findOne({ email: req.body.email })
            
            if (user) {
                const password = await bcrypt.compare(req.body.password, user.password)
                if (password) {
                    const token = genToken(user);
                    res.status(200).json({message:"Login Successful",token})
                } else {
                    res.status(400).json({error:"Invalid Info"})
                }
            } else {
                res.status(400).json({error:"User isn't found"})
            }

        } catch (err) {
            res.status(500).json({error:"Server Error"})
        }
    }
}

// get all users 
const users = async (req, res) => {
    try {
        const allUsers = await User.find()
        if (allUsers) {
            res.status(200).json({message:allUsers})
        }
    } catch (err) {
        res.status(400).json({error:err.messge})
    }
}

// get single user 
const user = async (req, res) => {
    console.log(req.params.userName);
    try {
        const user = await User.findOne({userName:req.params.userName})
        if (user) {
            
            const userPost = await Post.find({ userId: user._id })
            res.status(200).json({user:user,post:userPost})

        }
    } catch (err) {
        res.status(400).json({error:err.messge})
    }
}

// send data 
const sendData = async (req, res) => {
    console.log(req.params.id);
    try {
        const getUser = await User.find({ _id: req.params.id })
        if (getUser) {
            res.status(200).json({message:getUser})
        }
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

// update user 
const update = async (req, res,next) => {
    // const image=req.files
    const {name,userName,email,facebook,github,image}=req.body
    // console.log(image);
    try {
        if (!name || !userName || !email) {
            res.status(400).json({error:"Info field must be provided."})
        } else {
            // if (image) {
            //     const updateImage = await User.findByIdAndUpdate({ _id: req.params.id }, {image:image })
            //     if (updateImage) {
            //         // console.log("updateImage",updateImage);
            //         res.status(200).json({ message: "User Updated Succesfully" })
            //         next()
            //     }
            // }
            const userUpdate = await User.findByIdAndUpdate({ _id: req.params.id }, { name, userName, email, facebook, github,image})
            if (userUpdate) {
                const token = genToken(userUpdate);
                res.status(200).json({message:"User Updated Successfully",token:token})
            } else {
                res.status(400).json({error:"Fail to update user"})
            }
        }
        
    } catch (err) {
        res.status(400).json({error:err.message})
    }

}

module.exports={register,registerValidations,login,loginValidations,sendData,update,users,user}