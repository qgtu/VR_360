require('dotenv').config(); // Load biến từ .env
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// cloudinary.uploader.upload('public/anh1.jpg', { folder: 'panoramas' })
console.log('Cloudinary config:', cloudinary.config());

module.exports = cloudinary;