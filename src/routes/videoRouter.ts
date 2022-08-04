export {}
const Router = require("express")
const videoController = require("../controllers/videoController")
const authMiddleware = require("../middleware/AuthMiddleware")
const router = new Router()

router.post("/", videoController.create)
router.get("/", authMiddleware, videoController.getAll)
router.get("/:id",authMiddleware, videoController.getOne)
router.delete("/:id",authMiddleware, videoController.delete)
router.put("/:id",authMiddleware, videoController.update)

module.exports = router
