const router = require("express").Router();
const loginController = require('../controllers/loginController');
const {body, validationResult}= require(`express-validator`);

router.post('/',[
    //validating the request body parameters
    body('email',"Enter a valid email").isEmail(),
    body(`password`,"Password cannot be empty").exists()
], loginController.admin_login);
/*********************************************************************************************************************** */



module.exports = router;