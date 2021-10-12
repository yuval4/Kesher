const express = require("express");
const router = express.Router();
const UsersService = require("../services/UsersService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

// ANCHOR create new teacher user
router.post("/teacher", async (req, res) => {
    await UsersService.createNewUser(req.body.data, "Teacher");
    res.sendStatus(200);
});

// ANCHOR create new teacher user
router.post("/parent", async (req, res) => {
    await UsersService.createNewUser(req.body.data, "Parent");
    res.sendStatus(200);
});

// ANCHOR returns a list of children (name and pic)
router.get("/children/:id", async (req, res) => {
    const children = await UsersService.getChildrenByUserId(req.params.id);
    res.send(children);
});

module.exports = router;
