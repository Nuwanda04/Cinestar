import multer from "multer";
import { getNewUID } from "./helpers.js";
import * as mime from "mime-types";

export const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/blogs");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);
    cb(null, newFileName);
  },
});

export const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/users");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);
    cb(null, newFileName);
  },
});
