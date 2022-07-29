export {}
const Router = require("express")
const galleryController = require("../controllers/galleryController")
const authMiddleware = require("../middleware/AuthMiddleware")
const router = new Router()

router.get("/:id", authMiddleware, galleryController.getGallery)
router.post("/:id", authMiddleware, galleryController.addVideo)


module.exports = router
