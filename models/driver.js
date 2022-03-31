const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driver = new Schema({}, { strict: false, timestamps : true, collection: "drivers", versionKey: false });



module.exports = mongoose.model('driver', driver);