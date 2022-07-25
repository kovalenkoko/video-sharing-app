export {}
const Router = require("express")
const VideoController = require("../controllers/videoController")
const router = new Router()

router.post("/")
router.post("/")
router.get("/:id")
router.delete("/:id")
router.put("/:id")

module.exports = router
