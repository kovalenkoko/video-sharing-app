export {}
const Router = require("express")
const videoController = require("../controllers/videoController")
const router = new Router()

router.post("/", videoController.create)
router.get("/:id")
router.delete("/:id")
router.put("/:id")

module.exports = router
