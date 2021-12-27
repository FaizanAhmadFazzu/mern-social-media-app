const router = require("express").Router();
const auth = require("../middleware/auth");
const messageCtrl = require("../controllers/messageCtrl");

router.post("/message", auth, messageCtrl.createMessage);

module.exports = router;
