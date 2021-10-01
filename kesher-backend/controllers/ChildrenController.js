const express = require("express");
const router = express.Router();
const ChildrenService = require("../services/ChildrenService");
const { authenticateToken } = require("../auth/auth");
const { upload } = require("../utils/utils");

router.use(authenticateToken);

router.get("/:id", async (req, res) => {
    const child = await ChildrenService.getChildNameAndPic(req.params.id);
    res.send(child);
});

router.post("/", upload.single("photo"), async (req, res) => {
    req.body.profilePic = req.file.path;
    const childId = await ChildrenService.createNewChild(req.body);
    res.send(childId);
});

module.exports = router;
