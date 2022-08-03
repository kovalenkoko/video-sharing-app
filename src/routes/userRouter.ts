export {}
const Router = require("express")
const userController = require("../controllers/userController")
const {body} = require("express-validator")
const authMiddleware = require("../middleware/AuthMiddleware")
const router = new Router

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 5, max: 32}),
    userController.registration
)
router.post("/login",
    body("email").isEmail(),
    body("password").isLength({min: 5, max: 32}),
    userController.login)
router.post("/logout", userController.logout)
router.get("/refresh", userController.refresh)
router.post("/share",authMiddleware, userController.shareVideo)
router.get("/", authMiddleware, userController.getAll)
router.get("/shared", authMiddleware, userController.getShared)

module.exports = router
