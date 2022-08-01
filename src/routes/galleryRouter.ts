export {}
const Router = require("express")
const galleryController = require("../controllers/galleryController")
const authMiddleware = require("../middleware/AuthMiddleware")
const router = new Router()

router.get("/", authMiddleware, galleryController.getGallery)
router.post("/", authMiddleware, galleryController.addVideo)
router.delete("/", authMiddleware, galleryController.deleteVideo)
router.put("/", authMiddleware, galleryController.updateVideo)


module.exports = router
