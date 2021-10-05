const userCtrl = require("../controllers/userCtrl");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/search", auth, userCtrl.searchUser);

module.exports = router;