const express = require("express");
const router = express.Router();
const SchoolsService = require("../services/SchoolsService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

router.get("/:id", async (req, res) => {
    const children = await SchoolsService.getChildrenBySchoolId(req.params.id);
    res.send(children);
});

module.exports = router;
