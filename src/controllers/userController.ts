export{}
const ApiError = require("../error/ApiError")

class UserController {
    async registration(req, res) {

    }
    async login(req, res) {

    }
    async check(req, res, next) {
        const query = req.query
        if(!query.id){
            return next(ApiError.badRequest("id was not received"))
        }
        res.json(query)
    }
}
module.exports = new UserController()