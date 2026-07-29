import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import fs from 'fs';

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



/////////////////////////
// Uploads an image file
/////////////////////////
export const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, {resource_type: "auto"});
      console.log(result);
      return result; // Return the secure URL of the uploaded image
      fs.unlinkSync(imagePath); // Delete the local file after upload
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw error;
    }
};