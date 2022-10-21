const router = require("express").Router();
const multer = require("multer");
const {body, validationResult} = require('express-validator');
const studentController = require('../controllers/studentController');
//middleware
const login = require('../middleware/login');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
  })
  var upload = multer({storage: storage})


router.post("/",[
    body('name', 'Enter a valid name').isLength({min:4}),
    body('email', 'Enter a valid email').isEmail(),
    body('mobile','Enter a 10 digit mobile number').isNumeric().isLength(10),
    body('rollno',"Enter a minimum 5 digit roll number").isNumeric().isLength({min :5})
], login, upload.fields([
    { name: 'files1', maxCount: 1 },
    { name: 'files2', maxCount: 1 },
    { name: 'files3', maxCount: 1 }
  ]), studentController.student_create);

router.get("/", login, studentController.student_all);
router.get("/image/", login,  studentController.image_details);
router.get("/:name", login, studentController.findby_name);
router.delete("/:studentId", login, studentController.student_delete);
router.put("/:studentId", login, studentController.student_update);
module.exports = router;