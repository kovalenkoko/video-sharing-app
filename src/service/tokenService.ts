const jwt = require("jsonwebtoken")
const {Token} = require("../models/models")

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken,
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

}
module.exports = new TokenService()