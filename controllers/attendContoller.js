const Attend = require("../models/Attend");

const attend_all = async (req, res) =>{
        try {
            const attends = await Attend.find();
            res.json({attends});
        } catch (error) {
            res.json({message:error});
        }
};



const attend_create = async (req, res) => {
    let success=false;
    //check whether the admin with same email exists already
    var date = new Date();
    var time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    date = date.getDate()+"-"+(date.getMonth()+1)+"-" +date.getFullYear();
    console.log("DATE" + date);
    let nowdate=await Attend.findOne({date:date});
    console.log("NOW Date" + nowdate);

    let attend=await Attend.findOne({email:req.body.email});
    console.log(attend);
    if(attend && nowdate){
        return res.status(400).json({success,error:"Sorry a user with this email already exists"});
    }

    //ecrypting password before storing
    // const salt= await bcrypt.genSalt(10);
    // secPasswd = await bcrypt.hash(req.body.password,salt);

    
    //creating new admin
    attend=Attend.create(
        {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            rollno: req.body.rollno,
            address: req.body.address,
            date:date,
            time:time,
        }
    ).then( 
            res.json("Success")
        )
    .catch(err=>{
        //if there is some error while creating admin this will be executed
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
    );

};


const attend_delete = async (req,res) =>{
    try {
        const attend = await Attend.findByIdAndDelete(req.params.attendId);
        res.json(attend);
    } catch (error) {
        res.json({message :error});
    }
}

module.exports = {
    attend_all,
    attend_create,
    attend_delete
}