export{}
const jwt = require("jsonwebtoken")
const {Token} = require("../models/models")
const ApiError = require("../error/ApiError")

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30s"})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken,
        }
    }
    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        }catch (e){
            return null
        }
    }
    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        }catch (e){
            return null
        }
    }
    async saveToken(userId, refreshToken){

        const tokenData = await Token.findOne({where: {userId: userId}})
        if(tokenData){
            return await Token.update({refreshToken:refreshToken }, {where: {userId: userId}})
        }
        const token = await Token.create({userId: userId, refreshToken })
        return token
    }
    async deleteToken(refreshToken){
        const tokenData = await Token.destroy({where:{refreshToken: refreshToken}})
        return tokenData
    }
    async findToken(refreshToken){
        const tokenData = await Token.findOne({where:{refreshToken: refreshToken}})
        return tokenData
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.unauthorizedError()
        }
    }

}
module.exports = new TokenService()