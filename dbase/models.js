const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
    email: String,
    username: String,
    dateOfBirth: String,
    password: String
}));

const Post = mongoose.model('Post', new Schema({
    author: String,
    title: String,
    thumbnail: String,
    category: String,
    content: String,
    markers: Array,
    dateOfCreation: String
}));

const Category = mongoose.model('Category', new Schema({
    name: String
}));

module.exports = {
    User,
    Post,
    Category
}