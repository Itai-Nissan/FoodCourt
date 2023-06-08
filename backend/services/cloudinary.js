var cloudinary = require("cloudinary").v2
require('dotenv').config()


const CLOUD_NAME = process.env.CLOUD_NAME
const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const uploadImage = (image) => {
    //imgage = > base64
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image.src, opts, (error, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            console.log(error.message);
            return reject({ message: error.message });
        });
    });
};

module.exports = {
    uploadImage,
}

// module.exports.uploadMultipleImages = (images) => {
//     return new Promise((resolve, reject) => {
//       const uploads = images.map((base) => uploadImage(base));
//       Promise.all(uploads)
//         .then((values) => resolve(values))
//         .catch((err) => reject(err));
//     });
//   };

