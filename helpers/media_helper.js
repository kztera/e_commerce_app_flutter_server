const { unlink } = require('fs/promises');
const { existsSync, mkdirSync } = require('fs');
const multer = require('multer');
const path = require('path');

const ALLOWED_EXTENSIONS = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',  // Corrected mimetype from 'image/jgp' to 'image/jpg'
};

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
    
    // Check if the directory exists, if not, create it
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, 'public/uploads')
  },
  filename: function (_, file, cb) {
    const filename = file.originalname
      .replace(/ /g, '-')
      .replace(/(\.png|\.jpg|\.jpeg)$/, ''); // Use regex to replace extensions
    const extension = ALLOWED_EXTENSIONS[file.mimetype];
    cb(null, `${filename}-${Date.now()}.${extension}`);
  },
});

exports.upload = multer({
  storage: storage,
  // 5mb
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (_, file, cb) => {
    const isValid = ALLOWED_EXTENSIONS[file.mimetype];
    let uploadError = new Error(
      `Invalid image type\n${file.mimetype} is not allowed`
    );
    if (!isValid) return cb(uploadError);
    return cb(null, true);
  },
});

exports.deleteImages = async function (imageUrls, continueOnErrorName) {
  await Promise.all(
    imageUrls.map(async (imageUrl) => {
      const imagePath = path.resolve(
        __dirname,
        '..',
        'public',
        'uploads',
        path.basename(imageUrl)
      );
      try {
        await unlink(imagePath);
      } catch (error) {
        if (error.code === continueOnErrorName) {
          console.error(`Continuing with the next image: ${error.message}`);
        } else {
          console.error(`Error deleting image: ${error.message}`);
          throw error;
        }
      }
    })
  );
};
