import { Bucket } from "@google-cloud/storage";
// import { v4 } from "uuid";

export const uploadImage = (
  file: Express.Multer.File,
  bucket: Bucket,
  fileName: string
) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const fileNameWithoutWhiteSpaces = fileName.replace(" ", "_");
    const blob = bucket.file(
      originalname.replace(/.*(?=\.)/, fileNameWithoutWhiteSpaces)
    );
    const blobStream = blob.createWriteStream({
      resumable: false
    });
    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
