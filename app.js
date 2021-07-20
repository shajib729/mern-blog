require("dotenv").config()
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const router = require('./routes/UserRoutes')
const PostRoutes=require('./routes/PostRoutes')
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000
const path=require('path')

require('./db/conn')
const User = require('./models/Schema')

app.use(fileUpload())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router)
app.use(PostRoutes)

// 3: setup in heroku 
if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname,"/my-app/build/")))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,"my-app",'build','index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})