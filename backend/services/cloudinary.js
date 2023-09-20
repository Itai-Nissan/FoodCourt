var cloudinary = require("cloudinary").v2
require('dotenv').config()

const CLOUD_NAME = process.env.CLOUD_NAME
const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
})

const imgOptions = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
    folder: 'Cutting-board'
}

const vidOptions = {
    resource_type: "video",
    chunk_size: 6000000,
    timeout: 100000,
}

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image.src, imgOptions, (error, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            console.log(error.message);
            return reject({ message: error.message })
        })
    })
}

const uploadVideo = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(image.src, vidOptions, (error, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            console.log(error.message)
            return reject({ message: error.message })
        })
    })
}

module.exports = {
    uploadImage,
    uploadVideo,
}
