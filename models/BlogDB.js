const mongoose = require('mongoose');
mongoose.connect("MONGOLINK")
const Schema = mongoose.Schema;

var articleSchema = new Schema({
    name: String,
    ausername: String,
    upvotes: Number,
    comments: Array,
    title: String,
    description: String
})

var ArticleInfo = mongoose.model('articles', articleSchema)

module.exports = ArticleInfo;
