/****
 * NOSQL Database with mongoose Schema that stores user info and chat content
 */
const mongoose = require('mongoose');

const DB_URL='mongodb://localhost:27017/ezchat';
mongoose.connect(DB_URL);

const dbs = {
    user:{
        'user':{'type':String, 'require':true},
        'pwd':{'type':String, 'require':true},
        'type':{'type':String, 'require':true},
        'avatar':{'type':String},
        // Personal intro
        'desc':{'type':String},
        // Job Title
        'title':{'type':String},
        'company':{'type':String},
        'pos':{'type':String}
    },
    chat:{
        'chatid':{'type':String, 'require':true}, // chatroom id
        'from':{'type':String, 'require':true},
        'to':{'type':String, 'require':true},
        'read':{'type':Boolean, 'default':false},
        'content':{'type':String, 'require':true,default:''},
        'msg_time':{'type':Number,'default':new Date().getTime()}
    }
}

// input all info in const db(designed database) as schema
for (let m in dbs) {
    mongoose.model(m, new mongoose.Schema(dbs[m]));
}

module.exports = {
    getModel:function(name) {
        return mongoose.model(name);
    }
}