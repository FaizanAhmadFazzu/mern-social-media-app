const router = require("express").Router();
const postCtrl = require("../controllers/postCtrl");
const auth = require("../middleware/auth");

router.route("/posts")
.post(auth, postCtrl.createPost)
.get(auth, postCtrl.gePosts)

module.exports = router;
