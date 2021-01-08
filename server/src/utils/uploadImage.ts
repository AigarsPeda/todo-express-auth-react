import { Bucket } from "@google-cloud/storage";
// import { v4 } from "uuid";

export const uploadImage = (file: Express.Multer.File, bucket: Bucket) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    // /.*(?=\.)/g
    // .*(?=\.[^.]*$)
    // /.*(?=\.)/

    // bucket.getFiles().then((files) => console.log(files));

    const blob = bucket.file(originalname.replace(/.*(?=\.)/, "aigars"));
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
