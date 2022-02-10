const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ArticleInfo = require('./models/BlogDB')
const Users = require('./models/UserDB')
const Joi = require("joi");
const dotenv = require("dotenv").config();
const gravatar = require("gravatar")
const path = require("path")

const app = express();

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//cors
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Fake DB
// const articleInfo = {
//     'node':{
//         upvotes:0,
//         comments:[]
//     },
//     'react':{
//         upvotes:0,
//         comments:[]
//     }
// }

//searching DB
app.get('/api/article/:name',(req,res) => {
    const articleName = req.params.name;
    ArticleInfo.findOne({name: articleName})
    .then ((article)=>{
        res.json(article)
    })
});

app.get('/api/article',(req,res) => {
    ArticleInfo.find()
    .then ((article)=>{
        res.json(article)
    })
});



//UPVOTING POST

app.post('/api/article/:name/upvotes',(req,res) => {
    const articleName = req.params.name;
    const filter = {name: articleName};
    const update = {$inc: {upvotes:1}};
    ArticleInfo.findOneAndUpdate(filter,update,{new: true})
    .then((article)=>{
        res.json(article)
    })
    

})

//deleting POST

app.delete('/api/article/:name/deleting', verifyJWT, async(req,res) => {
    const isAdmin = req.user.isAdmin;
     const articleName = req.params.name;
    const filter = {name: articleName};
    if(isAdmin===true){
    ArticleInfo.deleteOne(filter,{new: true})
    .then((article)=>{
        res.json(article)
    })}else{
        res.json(message = "Admin can only perform this Action.")
    }

})

//updaate article



app.put('/api/article/:name/updatearticle', verifyJWT, async (req,res) => {
    //destructuring data from request and body
    const isAdmin = req.user.isAdmin;
    const articleName = req.params.name;
    const filter = {name: articleName};
    if(isAdmin===true){
    const {ausername, title, description} = req.body;
    const update = {ausername,title,description}
    ArticleInfo.updateOne (filter, update,{new: true})
    .then((article)=>{
       res.json(article)
    })}else{
        res.json(message = "Admin can only perform this Action.")
    }
})



//FOR Comments


app.post('/api/article/:name/comments',(req,res) => {
    const articleName = req.params.name;
    //destructuring data from request and body
    const {username, text} = req.body;
    //pushing data into array
    const filter = {name : articleName}
    const update = {$push: {comments: {username, text}}}
    ArticleInfo.findOneAndUpdate (filter,update,{new:true})
    .then((article)=>{
        res.json(article)
    })

 

})


//insert new article

app.post('/api/article/addarticle',verifyJWT, async(req,res) => {

    const isAdmin = req.user.isAdmin;

    //destructuring data from request and body
    const {name, ausername, title, description} = req.body;
    if(isAdmin===true){
    ArticleInfo.insertMany ({name,ausername,title,description})
    .then((article)=>{
        res.json(article)
    })}else{
        res.json(message = "You have no authorization to do this operation")
    }
})


// app.get('/',(req,res) => {
//     res.send("Welcome to Server")
// })

// app.post('/',(req,res) => {
//     res.send(`Hi ${req.body.name}, POST method Running`)
// })

// app.get('/article/:name',(req,res) => {
//    res.send(`Hi ${req.params.name}, URL para method Running`)
// })


//joi

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const loginValidation = (data => {
    return loginSchema.validate(data);
})





//User Authentications

app.post("/register", async(req,res)=>{
    const user = req.body;

        //check user name or pswd is taken before
        const takenUsername =  await Users.findOne({username: user.username})
        const takenEmail =  await Users.findOne({email: user.email})
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (takenUsername || takenEmail){
            res.json ({message: "Username or Email has already been taken"})
        }else if(!regex.test(user.email)) {
            res.json ({message:"Email is invalid"});
        }
        else{
            user.password = await bcrypt.hash(req.body.password, 10)
            const dbUser =  new Users({
                username: user.username.toLowerCase(),
                email: user.email.toLowerCase(),
                pfp: gravatar.url(user.username.toLowerCase(),  {s: '100', r: 'x', d: 'retro'}, true),
                name: user.name,
                gender:user.gender,
                password: user.password,
                isAdmin: false
            })
            dbUser.save()
            res.json({message: "Success"})
        }
})

//Sign Json Webtoken / Login
app.post("/login", (req, res) => {
    
    const userLoggingIn = req.body;

    if (!userLoggingIn) return res.json({message: "Server Error"})

    const validationError = loginValidation(userLoggingIn).error

    if (validationError) {
        return res.json({message: validationError.details[0].message})
    } else {
        Users.findOne({username: userLoggingIn.username.toLowerCase()})
        .then(dbUser => {
            if (!dbUser) {
                return res.json({message: "Invalid Username or Password"})
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
            .then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username,
                        email: dbUser.email,
                        isAdmin: dbUser.isAdmin,
                        gender:dbUser.gender,
                        name:dbUser.name,
                        pfp: dbUser.pfp

                    }
                    jwt.sign(
                        payload, 
                        process.env.JWT_SECRET,
                        {expiresIn: 86400},
                        (err, token) => {
                            return res.json({message: "Success", token: "Bearer " + token})
                        }
                    )
                } else {
                    return res.json({message: "Invalid Username or Password"})
                }
            })

        })
    }
})

//Accessing the current user

app.get("/getUsername", verifyJWT, (req,res) =>{
    res.json({isLoggedIn: true, username: req.user.username})
})

//Verify JSON Web Token

function verifyJWT(req, res, next) {
    // removes 'Bearer` from token
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false, 
                message: "Failed To Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            req.user.email = decoded.email
            req.user.isAdmin = decoded.isAdmin
            req.user.name= decoded.name
            req.user.gender= decoded.gender
            next()
        })
    } else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false})
    }
}

//user auth 
app.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json({isLoggedIn: true, username: req.user.username, isAdmin: req.user.isAdmin})
})


//user experiment


app.get("/profile", verifyJWT, (req, res) => {

    return res.json({isLoggedIn: req.body, 
        username: req.user.username, 
        email: req.user.email,
        name:req.user.name,
        gender:req.user.gender,
        isAdmin: req.user.isAdmin,
        pfp:req.user.pfp
})

    })
//user experiment end






// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



const port = process.env.PORT || 8000;
//Port number
app.listen(port,listening)
function listening (){
  console.log(`server running on ${port}`)
}