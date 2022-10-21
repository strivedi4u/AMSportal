const mongoose = require('mongoose');
const {Schema} = mongoose;
const AttendSchema = new Schema({
name:{
    type:String,
    required: true
},
email:{
    type:String,
    required: true
},
mobile:{
    type:String,
    required: true
},
rollno:{
    type:String,
    required: true
},
address:{
    type:String,
    required: true
},
date:{
    type:String,
    required: true
},

time:{
    type:String,
    required: true
}

})
const Attend = mongoose.model('attend', AttendSchema);
module.exports = Attend;