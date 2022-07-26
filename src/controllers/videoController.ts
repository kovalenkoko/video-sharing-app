export{}
const uuid = require("uuid")
const path = require("path")
const {VideoItem} = require("../models/models")
const ApiError = require("../error/ApiError")
const fs = require("fs")

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
    async getAll(req, res, next) {
      try {
          const videos = await VideoItem.findAll()
          return res.json(videos)
      }catch (e:any){
          next(ApiError.badRequest(e.message))
      }
    }
    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const video = await VideoItem.findOne({where:{id}})
            return res.json(video)
        }catch (e:any){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res, next){
        try {
            const {id} = req.params
            const videoItem = await VideoItem.findOne({where:{id}})
            await VideoItem.destroy({where:{id}})

            fs.unlink(path.resolve(__dirname, "..", "..", "static", videoItem.video), (e)=>{
                if(e){
                    return next(ApiError.internal(e.message))
                }
            })

            return res.json({message: `VideoItem with id:${id} was successfully deleted`})
        }catch (e:any){
            next(ApiError.badRequest(e.message))
        }
    }
    async update(req, res, next){
        try {
            const {id} = req.params
            const {title, description} = req.body
            const updatedObject = {
                title: title,
                description: description
            }
            await VideoItem.update(updatedObject, {where:{id}}
            )
            return res.json({message: `VideoItem with id:${id} was successfully updated`})
        }catch (e:any){
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new VideoController()