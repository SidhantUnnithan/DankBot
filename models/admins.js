const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    userid : {
        type : Number,
        required : true
    },
    username : {
        type : String,
        required : true
    },
});

module.exports = adminModel = mongoose.model('dankAdmins', adminSchema);