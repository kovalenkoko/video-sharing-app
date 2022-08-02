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
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.STRING, allowNull: false},
    video: {type: DataTypes.STRING, allowNull: false},
})
const Token = sequelize.define("token", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, allowNull: false},
})

const SharedVideo = sequelize.define("shared_video", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Gallery)
Gallery.belongsTo(User)

Gallery.hasMany(GalleryVideoItem)
GalleryVideoItem.belongsTo(Gallery)

VideoItem.hasOne(GalleryVideoItem)
GalleryVideoItem.belongsTo(VideoItem)

User.hasOne(Token)
Token.belongsTo(User)


SharedVideo.belongsTo(User, {as: "videoOwner", foreignKey: "videoOwnerId"})
SharedVideo.belongsTo(User, {as: "videoReceiver", foreignKey: "videoReceiverId"})

VideoItem.hasMany(SharedVideo)
SharedVideo.belongsTo(VideoItem)

module.exports = {
    User,
    Gallery,
    GalleryVideoItem,
    VideoItem,
    Token,
    SharedVideo,
}