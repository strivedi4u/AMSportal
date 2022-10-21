const router = require("express").Router();
const attendController = require('../controllers/attendContoller');
//middleware
const login = require('../middleware/login');



router.post("/", login, attendController.attend_create);
router.get("/", login, attendController.attend_all);
router.delete("/:attendId", login, attendController.attend_delete);
module.exports = router;