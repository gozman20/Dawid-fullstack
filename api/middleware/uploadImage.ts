import multer from "multer";
const fs = require("fs");
const path = require("path");
console.log({ __dirname });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("../frontend/public"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + "jpeg");
  },
});

export const upload = multer({ storage });
