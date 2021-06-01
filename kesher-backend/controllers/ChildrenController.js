const express = require("express");
const router = express.Router();
const ChildrenService = require("../services/ChildrenService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

router.get("/:id", async (req, res) => {
    const child = await ChildrenService.getChildNameAndPic(req.params.id);
    res.send(child);
});

router.post("/", async (req, res) => {
    await ChildrenService.createNewChild(req.body.data);
    res.sendStatus(200);
});

module.exports = router;
