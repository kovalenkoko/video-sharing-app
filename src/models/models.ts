export{}
const sequelize = require("../../db")
const {DataTypes} = require("sequelize")

const User = sequelize.define("user",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
} )

const Gallery = sequelize.define("gallery", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const GalleryVideoItem = sequelize.define("gallery_video_item", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const VideoItem = sequelize.define("video_item", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    video: {type: DataTypes.STRING, allowNull: false},
})
const Token = sequelize.define("token", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, allowNull: false},
})

// const SharedVideo = sequelize.define("shared_video", {
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

User.hasOne(Token)
Token.belongsTo(User)

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
    Token,
    //SharedVideo,
}