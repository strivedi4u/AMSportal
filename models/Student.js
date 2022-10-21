const mongoose = require('mongoose');
const {Schema} = mongoose;
const StudentSchema = new Schema({
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
image1:{
    type:String,
    required: true
},
image2:{
    type:String,
    required: true
},
image3:{
    type:String,
    required: true
},
date:{
    type:Date,
    default: Date.now
}

})
const Student = mongoose.model('student', StudentSchema);
module.exports = Student;