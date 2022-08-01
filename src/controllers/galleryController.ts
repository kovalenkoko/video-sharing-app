export{}
const ApiError = require("../error/ApiError")
const {GalleryVideoItem, Gallery, VideoItem} = require("../models/models")
const uuid = require("uuid")
const path = require("path")
const fs = require("fs")
const tokenService = require("../service/tokenService")

class GalleryController{
    async getGallery(req, res, next){
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const userData = tokenService.validateAccessToken(accessToken)

            const gallery = await Gallery.findOne({where:{userId:userData.id}})
            const galleryVideo = await GalleryVideoItem.findAll({where:{galleryId:gallery.id}})
            const videoItemIds: string[] = []
            galleryVideo.forEach((elem:any)=>{
                videoItemIds.push(elem.videoItemId)
            })
            const videos: object[] = []
            for await (const videoId of videoItemIds) {
                const video = await VideoItem.findOne({where:{id:videoId}})
                videos.push(video)
            }
            return res.json(videos)
        }catch (e:any){
            next(ApiError.badRequest(e.message))
        }
    }
    async addVideo(req, res, next){
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const userData = tokenService.validateAccessToken(accessToken)

            const gallery = await Gallery.findOne({where:{userId:userData.id}})

            const {title, description} = req.body
            const {video} = req.files
            let fileName = uuid.v4() + ".mp4"
            video.mv(path.resolve(__dirname, "..", "..", "static", fileName))
            const videoItem = await VideoItem.create({title, description, video : fileName})

            await GalleryVideoItem.create({galleryId:gallery.id, videoItemId:videoItem.id})

            res.json({message: `Video added to the user's gallery with id:${userData.id}`})

        }catch (e:any){
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteVideo(req, res, next){
        try {
            const accessToken = req.headers.authorization.split(" ")[1]
            const userData = tokenService.validateAccessToken(accessToken)
            const {title} = req.body
            if(!title){
                next(ApiError.badRequest("Title not received"))
            }
            const gallery = await Gallery.findOne({where:{userId:userData.id}})
            const videoItem = await VideoItem.findOne({where: {title: title}})
            await GalleryVideoItem.destroy({where:{videoItemId:videoItem.id, galleryId: gallery.id}})
            await VideoItem.destroy({where:{id: videoItem.id}})

            fs.unlink(path.resolve(__dirname, "..", "..", "static", videoItem.video), (e)=>{
                if(e){
                    return next(ApiError.internal(e.message))
                }
            })

            res.json({message: `VideoItem with title: ${title} from gallery with id: ${gallery.id} was successfully deleted`})

        }catch (e:any){
            next(ApiError.badRequest(e.message))
        }
    }
    async updateVideo(req, res, next){
        try {
            const {title, description, updatedTitle, updatedDescription} = req.body

            if(!title) {
                next(ApiError.badRequest("Title not received"))
            }
            const updatedObject = {
                title: updatedTitle,
                description: updatedDescription
            }

            await VideoItem.update(updatedObject, {where:{title}})
            res.json({message: `VideoItem with old title: ${title} was successfully updated`})

        }catch (e:any){
            next(ApiError.badRequest(e.message))
        }

    }
}
module.exports = new GalleryController()