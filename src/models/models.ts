const sequelizeInstance = require("../../db")
const {DataTypes} = require("sequelize")

const User = sequelizeInstance.define("user",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
} )

const Gallery = sequelizeInstance.define("gallery", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const GalleryVideoItem = sequelizeInstance.define("gallery_video_item", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const VideoItem = sequelizeInstance.define("video_item", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    video: {type: DataTypes.STRING, allowNull: false},
})

// const SharedVideo = sequelizeInstance.define("shared_video", {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     user_owner_id: {type: DataTypes.INTEGER,  allowNull: false},
//     user_id: {type: DataTypes.INTEGER,  allowNull: false},
//     video_item_id: {type: DataTypes.INTEGER,  allowNull: false},
//
// })

User.hasOne(Gallery)
Gallery.belongsTo(User)

Gallery.hasMany(GalleryVideoItem)
GalleryVideoItem.belongsTo(Gallery)

GalleryVideoItem.hasOne(VideoItem)
VideoItem.belongsTo(GalleryVideoItem)

// User.hasOne(SharedVideo)
// SharedVideo.belongsTo(User)
//
// SharedVideo.hasOne(VideoItem)
// VideoItem.belongsTo(SharedVideo)
//


module.exports = {
    User,
    Gallery,
    GalleryVideoItem,
    VideoItem,
    //SharedVideo,
}