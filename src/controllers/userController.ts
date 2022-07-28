export{}
const ApiError = require("../error/ApiError")
const {User} = require("../models/models")
const bcrypt = require("bcrypt")
const tokenService = require("../service/tokenService")
const UserDto = require("../dtos/userDto")
const {validationResult} = require("express-validator")


class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest("Validation error: email or password entered incorrectly"))
            }
            const {email, password} = req.body
            const candidate = await User.findOne({where:{email}})
            if(candidate){
                throw ApiError.badRequest(`User with email:${email} was created earlier`)
            }
            const hashPassword = await bcrypt.hash(password, 3)
            const user = await User.create({email, password: hashPassword})
            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            const userData = Object.assign(tokens, userDto)

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (e:any){
            next(ApiError.badRequest(e.message))
        }
    }
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email: email}})
        if(!user){
            return next(ApiError.badRequest("User not found"))
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            return next(ApiError.badRequest("Invalid password"))
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        const userData = Object.assign(tokens, userDto)

        res.cookie("refreshToken", userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData)

    }
    async logout(req, res, next) {

    }
}
module.exports = new UserController()