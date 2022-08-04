export{}
const ApiError = require("../error/ApiError")
const {User, Gallery, SharedVideo, VideoItem} = require("../models/models")
const bcrypt = require("bcrypt")
const tokenService = require("../service/tokenService")
const UserDto = require("../dtos/userDto")
const {validationResult} = require("express-validator")
const log4js = require("log4js");
const userLogger = log4js.getLogger("users");

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
            const userGallery = await Gallery.create({userId: user.id})

            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            const userData = Object.assign(tokens, userDto)

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (e:any){
            userLogger.error(e.message)
            next(ApiError.badRequest(e.message))
        }
    }
    async login(req, res, next) {
        try {
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
        }catch (e:any){
            userLogger.error(e.message)
            next(ApiError.badRequest(e.message))
        }

    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const tokenData = tokenService.deleteToken(refreshToken)
            if(!tokenData){
                return next(ApiError.badRequest("Token has not been deleted"))
            }
            res.clearCookie("refreshToken");
            return res.json({message: "Token has been successfully deleted"})
        }catch (e:any){
            userLogger.error(e.message)
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next){
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const userData = tokenService.validateAccessToken(accessToken)
            const usersFromDb = await User.findAll()
            const users = usersFromDb.filter(user => user.id != userData.id)
            res.json(users)
        }catch (e:any){
            userLogger.error(e.message)
            next(ApiError.badRequest(e.message))
        }
    }
    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies
            if (!refreshToken) {
                throw ApiError.UnauthorizedError();
            }
            const userData = tokenService.validateRefreshToken(refreshToken)
            const tokenFromDb = await tokenService.findToken(refreshToken)

            if(!userData || !tokenFromDb){
                return next(ApiError.unauthorizedError())
            }
            const user = await User.findOne({where: {id:userData.id}})
            const userDto = new UserDto(user)

            const tokens = tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            const userInfo = Object.assign(tokens, userDto)

            res.cookie("refreshToken", userInfo.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userInfo)
        }catch (e:any){
            userLogger.error(e.message)
            next(ApiError.internal(e.message))
        }
    }
    async shareVideo(req, res, next){
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const userData = tokenService.validateAccessToken(accessToken)
            const {title, idReceiver} = req.body
            if(!title || !idReceiver){
                next(ApiError.badRequest("Title or receiver's id not received"))
            }
            const videoItem = await VideoItem.findOne({where:{title}})

            let sharedVideo = await SharedVideo.findOne({where:{videoOwnerId: userData.id, videoReceiverId: idReceiver, videoItemId: videoItem.id }})
            if(sharedVideo){
                return res.json({message: "You have already shared this video with this user"})
            }else{
                sharedVideo = await SharedVideo.create({videoOwnerId: userData.id, videoReceiverId: idReceiver, videoItemId: videoItem.id })
            }
            res.json({message: "Video has been successfully shared", dataValues: {...sharedVideo.dataValues}})
        }catch (e:any){
            userLogger.error(e.message)
            next(ApiError.badRequest(e.message))
        }
    }
    async getShared(req, res, next){
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const userData = tokenService.validateAccessToken(accessToken)
            const shared = await SharedVideo.findAll({where: {videoReceiverId:userData.id}})

            const sharedVideos: object[] = []
            for await (const video of shared) {
                const videoItem = await VideoItem.findOne({where:{id: video.videoItemId}})
                const videoObject = {
                    fromUserWithId: video.videoOwnerId,
                    dataValues: {
                        ...videoItem.dataValues
                    }
                }
                sharedVideos.push(videoObject)
            }

            res.json(sharedVideos)

        }catch (e:any){
            userLogger.error(e.message)
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new UserController()