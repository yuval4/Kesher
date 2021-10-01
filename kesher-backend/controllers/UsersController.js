const express = require("express");
const router = express.Router();
const ParentsService = require("../services/ParentsService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

// ANCHOR create new user
router.post("/", async (req, res) => {
    await UserService.createNewUser(req.body.data);
    res.sendStatus(200);
});

// ANCHOR returns a list of children (name and pic)
router.get("/children/:id", async (req, res) => {
    const children = await UserService.getChildrenByUserId(req.params.id);
    res.send(children);
});

module.exports = router;
