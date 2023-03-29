var cloudinary = require("cloudinary").v2;

// const cloud_name = 'counditai'
const cloud_name = process.env.CLOUD_NAME;
// const api_key = '743814795936984'
const api_key = process.env.API_KEY;
// const api_secret = '7sSBUT0hjf7JFDm0ulyRz0Y-eT4'
const api_secret = process.env.API_SECRET;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const uploadImage = (image) => {
    console.log('cloudinary uploadimage:', image.alt);
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

