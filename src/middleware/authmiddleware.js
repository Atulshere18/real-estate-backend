const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            console.error("No token provided in headers");
            return res.status(401).json({ error: "Access denied, token missing" });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Token verified, user data:", req.user);

        next();
    } catch (err) {
  
        if (err.name === "TokenExpiredError") {
            console.error("Token expired");
            return res.status(401).json({ error: "Token expired" });
        }
        if (err.name === "JsonWebTokenError") {
            console.error("Invalid token:", err.message);
            return res.status(403).json({ error: "Invalid token" });
        }

        console.error("Token verification error:", err.message);
        res.status(403).json({ error: "Authentication failed" });
    }
};
