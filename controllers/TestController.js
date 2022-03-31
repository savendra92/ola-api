
const Test = require('../models/test');
const response = require('../utils/response');

class TestClass {

    async apiTest (req, res, next) {
   
    Test.insertMany({name:"Savendra"});
    return response.pass(res, "Test Api");
}
}


module.exports = TestClass;