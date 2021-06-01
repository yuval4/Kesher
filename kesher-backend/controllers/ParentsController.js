const express = require("express");
const router = express.Router();
const ParentsService = require("../services/ParentsService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

router.post("/", async (req, res) => {
    await ParentsService.createNewParent(req.body.data);
    res.sendStatus(200);
});

module.exports = router;
