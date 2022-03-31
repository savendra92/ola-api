const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({}, { strict: false, timestamps : true, collection: "users", versionKey: false });



module.exports = mongoose.model('user', user);