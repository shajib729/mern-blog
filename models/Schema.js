const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
        image: {
            type: String
        },
        name: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true
        },
        facebook:{
            type:String
        },
        github:{
            type:String
        }
    },
    {timestamps: true}
)

// stored the post
// userSchema.methods.addPost = async function (title, body, image , description, slug) {
//     try {
//         this.post=this.post.concat({title, body, image , description, slug})
//         await this.save();
//         return this.post;
//     } catch (err) {
//         console.log(err);
//     }
// }

// Collection creation
const User = mongoose.model("USER", userSchema)

module.exports=User