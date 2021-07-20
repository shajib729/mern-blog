require("dotenv").config()
const mongoose = require('mongoose')
const DB = process.env.DB_URL

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("DB connection successful");
}).catch((err) => {
    console.log("Fail to connect DB");
})