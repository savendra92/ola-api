const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const User = require('../models/users');

module.exports = async (req, res, next) => {

    const authorization = req.get('Authorization');
    if (!authorization)
    if (authorization == null || authorization == undefined) return response.fail(res, "Token is missing", null,  200);
        const token = authorization.split(" ")[1];
    let decoded;
    try {
         decoded = jwt.verify(token, 'savendra');
        
      } catch(err) {
       return  response.fail(res, err.message, null,  200);
      }

    if (!decoded) {
       return response.fail(res, "Unauthenticated", null,  200);
      }
    
    const user = await User.findById(decoded._id).lean();
    // console.log(decoded, user);

    if (!user) {
            
        return response.fail(res, "User Not in Database", null,  200);
    }
    user.name = decoded.name;
    req.user = user;

    next();
}