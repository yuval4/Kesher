const express = require("express");
const router = express.Router();
const ChildrenService = require("../services/ChildrenService");
const { authenticateToken } = require("../auth/auth");
const multer = require("multer");
const path = require("path");

router.use(authenticateToken);

router.get("/:id", async (req, res) => {
    const child = await ChildrenService.getChildNameAndPic(req.params.id);
    res.send(child);
});

const { upload } = require("../utils/utils");

router.post("/", upload.single("photo"), async (req, res) => {
    console.log("cool");
    req.body.profilePic = req.file.path;
    // const childId = await ChildrenService.createNewChild(req.body);
    res.sendStatus(200);
});
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(
//             null,
//             file.fieldname +
//                 "-" +
//                 uniqueSuffix +
//                 path.extname(file.originalname)
//         );
//     },
// });

// const upload = multer({ storage: storage });

// router.post("/", upload.single("photo"), async (req, res) => {
//     req.body.profilePic = req.file.path;
//     const childId = await ChildrenService.createNewChild(req.body);
//     res.send(childId);
// });

module.exports = router;
