const router = require("express").Router();
const studentController = require('../controllers/studentController');
router.get("/", studentController.student_all);
  module.exports = router;
