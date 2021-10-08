const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET);
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;

        next();
    });
};

const verifyParent = (req, res, next) => {
    if (req.user.role === "Parent") {
        next();
    } else {
        return res.sendStatus(401);
    }
};

const verifyTeacher = (req, res, next) => {
    if (req.user.role === "Teacher") {
        next();
    } else {
        return res.sendStatus(401);
    }
};

module.exports = {
    generateAccessToken,
    authenticateToken,
    verifyParent,
    verifyTeacher,
};
