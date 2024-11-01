const jwt = require("jsonwebtoken");

async function middleware(req, res, next) {
    const token = req.header("X-Auth-Token");
    if (!token) {
        return res.status(401).json({ message: "Access denied", status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.decodedToken = decoded;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        res.status(400).json({ message: "Invalid token", status: 400 });
    }
}

module.exports = middleware;
