export {}
const Router = require("express")
const router = new Router()

const userRouter = require("./userRouter")
const videoRouter = require("./videoRouter")
const galleryRouter = require("./galleryRouter")

router.use("/user", userRouter)
router.use("/video", videoRouter)
router.use("/gallery", galleryRouter)

module.exports = router
