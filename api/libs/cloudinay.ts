import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dvbjipjas",
  api_key: "615357198268121",
  api_secret: "ATDaDjKlHV1ClAPtPS6vxNJVoIs",
});

export const cloudinaryUploadImage = async (fileToUpload) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(fileToUpload, (result) => {
      console.log(result);
      resolve(
        {
          url: result.secure_url,
          assets_id: result.asset_id,
          public_id: result.public_id,
        }
        // { resource_type: "auto" }
      );
    });
  });
};

export const cloudinaryDeleteImage = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.destroy(fileToDelete, (result) => {
      console.log(result);

      resolve(
        {
          url: result.secure_url,
          assets_id: result.asset_id,
          public_id: result.public_id,
        }
        // { resource_type: "auto" }
      );
    });
  });
};

// module.exports = { cloudinaryUploadImage, cloudinaryDeleteImage };
