
    const upload_create = async (req,res) =>{
        try {
            console.log(req);
           //res.json("Success");
        } catch (error) {
            res.json({message :error});
        }
    }
    module.exports = {upload_create};