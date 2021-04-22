const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    highscore: Number
}, {
    timestamps: false
});

module.exports = mongoose.model('User', UserSchema, 'Users');