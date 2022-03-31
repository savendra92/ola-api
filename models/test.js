const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const test = new Schema({}, { strict: false, timestamps : true, collection: "test", versionKey: false });



module.exports = mongoose.model('test', test);