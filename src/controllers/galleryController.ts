export{}
const ApiError = require("../error/ApiError")
const {GalleryVideoItem, Gallery, VideoItem} = require("../models/models")
const uuid = require("uuid")
const path = require("path")

class GalleryController{
    async getGallery(req, res, next){
        try {
            const {id} = req.params
            if(!id){
                next(ApiError.badRequest("Id not received"))
            }
            const gallery = await Gallery.findOne({where:{userId:id}})
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
            const {id} = req.params
            if(!id){
                next(ApiError.badRequest("Id not received"))
            }
            const gallery = await Gallery.findOne({where:{userId:id}})

            const {title, description} = req.body
            const {video} = req.files
            let fileName = uuid.v4() + ".mp4"
            video.mv(path.resolve(__dirname, "..", "..", "static", fileName))
            const videoItem = await VideoItem.create({title, description, video : fileName})

            await GalleryVideoItem.create({galleryId:gallery.id, videoItemId:videoItem.id})

            res.json({message: `Video added to the user's gallery with id:${id}`})

        }catch (e:any){
            next(ApiError.badRequest(e.message))
        }

    }
}
module.exports = new GalleryController()