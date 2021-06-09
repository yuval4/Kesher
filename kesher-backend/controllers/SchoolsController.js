const express = require("express");
const router = express.Router();
const SchoolsService = require("../services/SchoolsService");
const { authenticateToken } = require("../auth/auth");

router.use(authenticateToken);

router.get("/:id", async (req, res) => {
    const children = await SchoolsService.getChildrenBySchoolId(req.params.id);
    res.send(children);
});

router.patch("/children", async (req, res) => {
    await SchoolsService.addChildToSchool(req.body.schoolId, req.body.childId);
    return res.sendStatus(200);
});

module.exports = router;
