const multer = require("multer");
const mime = require("mime-types");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "user-" + uniqueSuffix + "." + mime.extension(file.mimetype));
    },
});

const upload = multer({ storage: storage });

module.exports = { upload };
