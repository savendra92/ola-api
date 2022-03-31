const Driver = require('../models/driver');
const User = require('../models/user');

exports.register = async (req,res) => {

    try {
const name = req.body.name;
const contact = req.body.contact;
const email = req.body.email;
const address = req.body.address;
const vehicle_name = req.body.vehicle_name;
const vehicle_number = req.body.vehicle_number;
const isOnline = req.body.isOnline;
const lat = req.body.lat;
const long = req.body.long;
const location = {lat, long};
const date = new Date();
const createdAt = date;
const updatedAt = date;

const vehicle = {vehicle_name, vehicle_number};

const addDriver = await Driver.insertMany({name,contact,email, address,vehicle,location, isOnline,createdAt, updatedAt});

if(addDriver) {
   return res.send({status : "success", "msg":"Driver Registered" });
}
return res.send({status : "fail", "msg":"Driver not Registered" });

}
catch(err) {
    
    return res.send({status : "fail", "msg":err.message });
    }

}


exports.setDriverAvailability = async (req,res) => {

    try {

const contact = req.body.contact;


const isOnline = req.body.isOnline;
const lat = req.body.lat;
const long = req.body.long;
const location = {lat, long};
const date = new Date();

const updatedAt = date;



const addDriver = await Driver.updateOne({contact},{'$set':{location, isOnline, updatedAt}});


if(addDriver) {
   return res.send({status : "success", "msg":"Driver status Updated" });
}
return res.send({status : "fail", "msg":"Driver status Updated" });

}
catch(err) {
    
    return res.send({status : "fail", "msg":err.message });
    }

}


exports.endTrip = async (req,res) => {

    try {

const usercontact = req.body.usercontact;
const drivercontact = req.body.drivercontact;


const date = new Date();


/* set end time to user ride */
let endtrip = await User.updateOne({contact: usercontact}, {'$set': {"driver.rideEnd": date }});
/* update ride details to driver collection */

const getUser = await User.findOne({contact : usercontact}).lean()
if(getUser == null) return res.send({status : "fail", "msg":"unregistersed user" });


const updateDriver = await Driver.updateOne({contact: drivercontact},{'$set':{userRide:{user:usercontact, ridestart:getUser.driver.ridestart, rideEnd:getUser.driver.ridestart}}});


if(updateDriver) {
   return res.send({status : "success", "msg":"Ride End" });
}
return res.send({status : "fail", "msg":"something went Wrong" });

}
catch(err) {
   // console.log(err);
    return res.send({status : "fail", "msg":err.message });
    }

}
