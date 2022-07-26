export {}
const Router = require("express")
const videoController = require("../controllers/videoController")
const router = new Router()

router.post("/", videoController.create)
router.get("/", videoController.getAll)
router.get("/:id", videoController.getOne)
router.delete("/:id", videoController.delete)
router.put("/:id", videoController.update)

module.exports = router
