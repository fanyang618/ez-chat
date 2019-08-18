/*
User login/signup express logic
*/
const express = require('express');
const util = require('utility')
const router = express.Router();
const db = require('./db')
const User = db.getModel('user')
const Chat = db.getModel('chat')

// return user lists according to type
router.get('/list', function(req, res) {
    const {type} = req.query
    //User.remove({type}, function(e, d){})
    User.find({type}, function(err, doc) {
        return res.json({code:0, data:doc})
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
        const userModel = new User({user, type, pwd:md5Pwd(pwd)})
        userModel.save(function(e, d) {
            if (e) {
                return res.json({code: 1, msg:'Sorry, something is wrong with the server'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code:0, data:{user, type, _id}})
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
            res.cookie('userid', doc._id);
            return res.json({code:0, data:doc})
        }
    })
})

// update personal info, return error code if userid does not exist
router.post('/update', function(req, res) {
    const userid = req.cookies.userid
    if (!userid) {
        return res.json({code:1});
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, function(err,doc) {
        const data = Object.assign({}, {
            user:doc.user,
            type:doc.type
        }, body)
        return res.json({code:0, data})
    })
})

router.get('/getmsglist', function(req, res) {
    const user = req.cookies.user
    //'$or':[{from:user, to:user}]
    Chat.find({}, function(err, doc) {
        if (!err) {
            return res.json({code:0, msgs:doc})
        }
    })
})

// md5 encryption for password
function md5Pwd(pwd) {
    const key = 'cht1jkl789&fa@*y$'
    return util.md5(key+pwd)
}

// if cookie is recognized stay logged in
router.get('/info', function(req, res) {
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code:1});
    }
    User.findOne({_id:userid}, {'pwd':0}, function(err, doc) {
        if (err) {
            return res.json({code:1, msg:'Sorry, something is wrong with the server'})
        }
        if (doc) {
            return res.json({code:0, data:doc})
        }
    })
})

module.exports = router