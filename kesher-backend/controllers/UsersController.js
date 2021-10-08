const express = require("express");
const router = express.Router();
const UsersService = require("../services/UsersService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

// ANCHOR create new user
router.post("/", async (req, res) => {
    await UsersService.createNewUser(req.body.data);
    res.sendStatus(200);
});

// ANCHOR returns a list of children (name and pic)
router.get("/children/:id", async (req, res) => {
    const children = await UsersService.getChildrenByUserId(req.params.id);
    res.send(children);
});

module.exports = router;
