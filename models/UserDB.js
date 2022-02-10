const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sreesankar:Krishna@cluster0.nshve.mongodb.net/ict-blog-bootcamp?retryWrites=true&w=majority")
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required:true,},
    email: {type: String, required:true,},
    name: {type: String, required:true,},
    gender: {type: String, required:true,},
    password: {type: String, required:true,},
    isAdmin: {type: Boolean, required:true,},
}, {timestamps:true})

var Users = mongoose.model('users', userSchema)

module.exports = Users;
