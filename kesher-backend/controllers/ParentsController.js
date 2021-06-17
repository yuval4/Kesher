const express = require("express");
const router = express.Router();
const ParentsService = require("../services/ParentsService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

// ANCHOR create new parent
router.post("/", async (req, res) => {
    await ParentsService.createNewParent(req.body.data, req.body.childId);
    res.sendStatus(200);
});

// ANCHOR returns a list of children (name and pic)
router.get("/children/:id", async (req, res) => {
    const children = await ParentsService.getChildrenByParentId(req.params.id);
    res.send(children);
});

module.exports = router;
