const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectionUrl = require('./dbase/connection').dbase;
const secret = require('./dbase/secretKey').key;
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;
const User = require('./dbase/models').User;
const Post = require('./dbase/models').Post;
const Category = require('./dbase/models').Category;

mongoose.connect(connectionUrl);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/dist'));



app.post('/sign-up', (req, res) => {
    const email = req.body.email, 
          username = req.body.username,
          dateOfBirth = req.body.dateOfBirth,
          password = req.body.password,
          existedEmail = null,
          existedUserName = null,
          emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegExp)) {
        if (username.length > 5) {
            User.findOne({email}, (err, foundPerson) => {
                if (!foundPerson) {
                    User.findOne({username}, (err, returnedUser) => {
                        if (!returnedUser) {
                            const newUser = new User({
                                email,
                                username,
                                dateOfBirth,
                                password
                            });
                            newUser.save((err) => {
                                if (err) {
                                    res.json({errWhileSaving: true});
                                }
                            });
                            res.json({
                                response: 'success'
                            });
                        } else {
                            res.json({
                                response: 'usernameInUse'
                            });
                        }
                    });
                } else {
                    res.json({
                        response: 'emailInUse'
                    });
                }
            });
        } else {
            res.json({
                response: 'wrongUserName'
            })
        }
    } else {
        res.json({
            response: 'wrongEmail'
        })
    }
});


app.post('/log-in', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (foundUser && foundUser.password == req.body.password) {
            const token = jwt.sign(foundUser, secret, {
                expiresIn: 3000
            });
            res.json({
                token,
                success: true,
                loggedUser: foundUser.username
            });
        } else {
            res.json({
                success: false
            });
        }
    });
});

app.post('/get-posts', (req, res) => {
    let categories, posts;
    Category.find({}, (err, foundCategories) => {
        categories = foundCategories;
        Post.find({}, (err, returnedPosts) => {
            posts = returnedPosts;
            res.json({
                categories,
                posts
            });
        });
    });
});


app.use((req, res, next) => {
    const token = req.body.token;
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log('token expirede');
                res.json({
                    errorWithToken: true
                });
            } else {
                next();
            }
        });
    } else {
        console.log('token not found', req.body);
        res.json({
            tokenNotFound: true
        });
    }
});


app.post('/post-blog', (req, res) => {
    Category.findOne({name: req.body.category}, (err, foundCategory) => {
        if (!foundCategory) {
            const newCategory = new Category ({
                name: req.body.category
            });
            newCategory.save((err) => {
                if (err) {
                    console.log('error with saving category');
                }
            });
        } 
        const post = new Post({
            author: req.body.author,
            title: req.body.title,
            thumbnail: req.body.thumbnail,
            category: req.body.category,
            content: req.body.content,
            markers: req.body.markers,
            dateOfCreation: req.body.dateOfCreation 
        });
        post.save((err) => {
            if (err) {
                res.json({success: false})
            } else {
                Category.find((err, allCategories) => {
                    Post.find({}, (err, foundPosts) => {
                        res.json({success: true, allCategories, foundPosts})
                    });
                });
            }
        });
    });    
});

app.post('/filter-posts', (req, res) => {
    Post.find(req.body.filterValue == ''? {} : {category: req.body.filterValue}, (err, foundPosts) => {
        if (err) {
            console.log(err.message);
        } 
        res.json({
            posts: foundPosts
        });
    });
});

app.post('/remove-post', (req, res) => {
    Post.remove({_id: req.body.id}, (err) => {
        if (err) console.log('error with deleting');
        Post.find({}, (err, returnedPosts) => {
            if (err) console.log('error with searching of posts');
            res.json({
                posts: returnedPosts
            });
        });
    });
});

app.post('/update-post', (req, res) => {
    Category.findOne({name: req.body.category}, (err, foundCategory) => {
        if (!foundCategory) {
            const newCategory = new Category ({
                name: req.body.category
            });
            newCategory.save((err) => {
                if (err) {
                    console.log('error with saving category');
                }
            });
        } 
        Post.update({_id: req.body.id}, {
                                        title: req.body.title, 
                                        thumbnail: req.body.imageUrl, 
                                        content: req.body.text, 
                                        category: req.body.category,
                                        markers: req.body.markers,
                                        dateOfCreation: req.body.dateOfCreation
                                    }, (err, foundPost) => {
        Post.find({}, (err, foundPost) => {
            if (err) console.log('error with searching of posts');
                res.json({
                    posts: foundPost
                }); 
            }); 
        });
    });    
});

app.get('*', (req, res) => {
    res.sendfile(__dirname + '/dist/index.html');
});


app.listen(port, () => {
    console.log('Server is up to run');
});



