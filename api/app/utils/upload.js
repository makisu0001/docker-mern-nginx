const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    switch (file.fieldname) {
      case "cover":
      case "resource":
        cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
        break;
      default:
        cb(null, file.fieldname + path.extname(file.originalname));
    }
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 200, // 50MB
  },
});
module.exports = upload;
