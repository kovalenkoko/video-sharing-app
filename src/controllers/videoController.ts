export{}
const uuid = require("uuid")
const path = require("path")
const {VideoItem} = require("../models/models")
const ApiError = require("../error/ApiError")

class VideoController {
    async create(req, res, next) {
        try {
            const {title, description} = req.body
            const {video} = req.files
            let fileName = uuid.v4() + ".mp4"
            video.mv(path.resolve(__dirname, "..", "..", "static", fileName))

            const videoItem = await VideoItem.create({title, description, video : fileName})
            return res.json(videoItem)
        }catch (e:any){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {

    }
    async getOne(req, res) {

    }
}
module.exports = new VideoController()