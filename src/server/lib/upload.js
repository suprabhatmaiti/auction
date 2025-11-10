import multer from "multer";
import path from "path";

const storage = (folderName) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, base + "-" + uniqueSuffix + ext);
    },
  });
};

export const uploadAvatar = multer({
  storage: storage("avatars"),
  limits: { fileSize: 5 * 1024 * 1024 },
});
export const uploadProductImages = multer({
  storage: storage("product-images"),
  limits: { fileSize: 5 * 1024 * 1024 },
});
