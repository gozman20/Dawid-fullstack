import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dvbjipjas",
  api_key: "615357198268121",
  api_secret: "ATDaDjKlHV1ClAPtPS6vxNJVoIs",
  secure: true,
});

export const uploadPhoto = async (req: any, res: any) => {
  //The name field in upload.array(<NAME>,10) in the backend MUST CORRESPOND
  //WITH YOUR FRONTEND data.append(<NAME>,files[i]) name field for it to work

  try {
    const files = req.files as any;

    if (!files) return res.json({ msg: "no files" });

    const pictureArray = files?.map((file: any) =>
      cloudinary.uploader.upload(file.path)
    );
    Promise.all(pictureArray)
      .then((response) => {
        const formattedResponse = response.map((res) => res.secure_url);

        res.json(formattedResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
