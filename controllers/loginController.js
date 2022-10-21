const dotenv = require("dotenv");
const Login = require("../models/Login");

const jwt=require(`jsonwebtoken`);
const {body, validationResult}= require(`express-validator`);

const admin_login = async (req,res)=>{
    //console.log(req.body);
    let success=false;
    //if there are errors return bad request and the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    try
    {
        let admin= await Login.findOne({email:req.body.email});
        if(!admin)
        {
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        const passwordCompare= (req.body.password === admin.password);
        if(!passwordCompare){
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        const data={
            admin:{
                id:admin.id
            }
        };

        //jwt token that will provide secure access to user
        const authToken=jwt.sign(data,process.env.JWT_SECRET);
        success=true;
        tokenfor= "admin";
        //console.log(authToken);
        adminId = admin.id;
        res.json({success,tokenfor,authToken, adminId});
        

    }catch(err)
    {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }

    
}








    





module.exports = {
    admin_login
}
