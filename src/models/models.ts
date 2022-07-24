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

User.hasOne(Gallery)
Gallery.belongsTo(User)

Gallery.hasMany(GalleryVideoItem)
GalleryVideoItem.belongsTo(Gallery)

GalleryVideoItem.hasOne(VideoItem)
VideoItem.belongsTo(GalleryVideoItem)

module.exports = {
    User,
    Gallery,
    GalleryVideoItem,
    VideoItem
}