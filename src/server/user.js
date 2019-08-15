/*
User login/signup logic
*/

const express = require('express');
const util = require('utility')
const router = express.Router();
const db = require('./db')
const User = db.getModel('user')

router.get('/list', function(req, res) {
    // User.remove({}, function(e, d){})
    User.find({}, function(err, doc) {
        return res.json(doc)
    })
})

// Input: Username, password, type
// Return error code and message if username exists already
// create user profile and return success code otherwise 
router.post('/register', function(req, res) {
    const {user, pwd, type} = req.body
    User.findOne({user}, function(err,doc) {
        if (doc) {
            return res.json({code:1, msg:'User name already exists'})
        }
        User.create({user, pwd:md5Pwd(pwd), type}, function(e, d) {
            if (e) {
                return res.json({code: 1, msg:'Sorry, something is wrong with the server'})
            }
            return res.json({code:0})
        })
    })
})

// Input: Username, password
// Return error code and message if input data is not found
// Return user data (except password) if login successful 
router.post('/login', function(req, res) {
    const {user, pwd} = req.body
    User.findOne({user, pwd:md5Pwd(pwd)}, {'pwd':0}, function(err,doc) {
        if (!doc) {
            return res.json({code:1, msg:'Incorrect Username/Password'})
        } else {
            return res.json({code:0, data:doc})
        }
    })
})

// md5 encryption for password
function md5Pwd(pwd) {
    const key = 'cht1jkl789&fa@*y$'
    return util.md5(key+pwd)
}

router.get('/info', function(req, res) {
    // To Do: cookie verification
    return res.json({code:1});
})

module.exports = router