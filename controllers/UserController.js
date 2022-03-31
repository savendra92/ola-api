const User = require('../models/user');
const Driver = require('../models/driver');

exports.register = async (req,res) => {

    try {
const name = req.body.name;
const contact = req.body.contact;
const email = req.body.email;
const lat = req.body.lat;
const long = req.body.long;
const location = {lat, long};
const date = new Date();
const createdAt = date;
const updatedAt = date;



const addUser = await User.insertMany({name,contact,email, location, createdAt, updatedAt});

if(addUser) {
   return res.send({status : "success", "msg":"User Registered" });
}
return res.send({status : "fail", "msg":"User not Registered" });

}
catch(err) {
    
    return res.send({status : "fail", "msg":err.message });
    }

}


exports.requestCab = async (req,res) => {

    try {

const contact = req.body.contact.toString();
const lat = req.body.lat;
const long = req.body.long;
const UserLocation = {lat, long};


/* we can loop through drivers in that particular area and city for demo purpose i took first driver from collection or rather than looping we also use Geospatial queries */
let driver = await Driver.findOne({isOnline:"1"}).lean();
//console.log({ driver});
if(driver== null)
return res.send({status : "fail", "msg":"No cab Available" });

const DriverLocation = {lat : driver.location.lat, long : driver.location.long};

let x1 = DriverLocation.lat;
let y1 = DriverLocation.long;

let x2 = UserLocation.lat;
let y2 = UserLocation.long;

let sum  = Math.pow((x2-x1),2) + Math.pow((y2-y1),2)
let distance = Math.sqrt(sum);

//console.log(distance);
if(distance > .4){
    return res.send({status : "fail", "msg":"No cab Available" });
}



/* assign driver to user */
let assign = await User.updateOne({contact}, {'$set': {"driver":{ driver:driver.contact, ridestart: new Date()}}});
//console.log({assign});
return res.send({status : "success", "msg":"Driver found", data : driver });


}
catch(err) {
    
    return res.send({status : "fail", "msg":err.message });
    }

}