const express = require("express");
const router = express.Router();
const ChildrenService = require("../services/ChildrenService");
const { authenticateToken } = require("../auth/auth");
const multer = require("multer");

router.use(authenticateToken);

router.get("/:id", async (req, res) => {
    const child = await ChildrenService.getChildNameAndPic(req.params.id);
    res.send(child);
});

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), async (req, res) => {
    console.log("body", req.body.data.image._parts);
    // const childId = await ChildrenService.createNewChild(req.body.data);
    // res.send(childId);
    res.sendStatus(200);
});

module.exports = router;
