export {}
const Router = require("express")
const userController = require("../controllers/userController")
const {body} = require("express-validator")
const router = new Router

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 5, max: 32}),
    userController.registration
)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get("/refresh", userController.refresh)

module.exports = router
