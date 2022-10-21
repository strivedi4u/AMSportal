const Student = require("../models/Student");
const {body, validationResult} = require('express-validator');
const fs = require('fs');


const student_all = async (req, res) =>{
        try {
            const students = await Student.find();
            res.json({students});
        } catch (error) {
            res.json({message:error});
        }
};


const findby_name = async (req, res) =>{
    try {
        const student = await Student.find({name:req.params.name},{});
        res.json(student);
    } catch (error) {
        res.json({message:error});
    }
};


const image_details = async (req, res) =>{
    try {
        const images = await Student.find({}, {name:1, image1:1, image2:1, image3:1});
        res.json(images);
    } catch (error) {
        res.json({message:error});
    }
};


const student_create = async (req, res) =>{
    console.log("Hi");
    const formData = req.files;
    console.log(formData);
    console.log(formData.files1[0].filename);
   const parseObject = JSON.parse(req.body.model); 
   console.log("Hi");  

    let flag  = false
    const errors = validationResult(parseObject);
    if(!errors.isEmpty()){
        console.log("Hiello");  
        return res.status(400).json({
            flag,
            error:errors.array()
        });
    }
    console.log("Hiello11111111111111");  
    let student = await Student.findOne({email:parseObject.email});
    console.log("Hiello22222222222222");  
    if(student){
        return res.status(400).json({
            flag,
            error:"Sorry User already exist"})
    }
    console.log("Hiello333333333333");  
    console.log(parseObject);
    var students = Student.create({
        name: parseObject.name,
        email: parseObject.email,
        mobile: parseObject.mobile,
        rollno: parseObject.rollno,
        address: parseObject.address,
        image1: formData.files1[0].filename,
        image2: formData.files2[0].filename,
        image3: formData.files3[0].filename
    }).then(
      //  console.log("Sucees" + done);
        res.json("Success")
    
    ).catch(err =>{
       // console.log("error " + err);
       // res.status(500).send("Internal Server Error!");
    })
};


const student_delete = async (req,res) =>{
    const student = await Student.find({_id:req.params.studentId}, {image1:1, image2:1, image3:1});
    console.log(student);
    console.log(student[0].image1);
    fs.unlink('./uploads/'+student[0].image1, function (err) {
        if(err) {
            throw err;
        }
            
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
    fs.unlink('./uploads/'+student[0].image2, function (err) {
        if (err){
            throw err;
        } 
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
    fs.unlink('./uploads/'+student[0].image3, function (err) {
        if (err){
            throw err;
        } 
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });

    try {
        const student = await Student.findByIdAndDelete(req.params.studentId);
        res.json(student);
    } catch (error) {
        res.json({message :error});
    }
}


const student_update = async (req, res) => {
    try {
        const students = {
          name: req.body.name,
          email: req.body.email,
          address: req.body.address,
          mobile: req.body.mobile,
          rollno: req.body.rollno
        };
    
        const updatedStudent = await Student.findByIdAndUpdate(
          { _id: req.params.studentId },
          students
        );
        res.json(updatedStudent);
      } catch (error) {
        res.json({ message: error });
      }




};





module.exports = {
    student_all,
    student_create,
    student_delete,
    image_details,
    findby_name,
    student_update

}