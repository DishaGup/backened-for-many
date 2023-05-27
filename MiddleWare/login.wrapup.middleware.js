const jwt = require("jsonwebtoken");

const auths = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "wrapup");
      if (decoded) {
        req.body.userId = decoded.userId;
        req.body.firstname = decoded.firstname;
        next();
      }
    } catch (error) {
      // Handle token verification errors appropriately
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("user_id");

    if (storedToken && storedUserId) {
      req.body.userId = storedUserId;
      next();
    } else {
      res.status(401).json({ error: "Authentication required" });
    }
  }
};

module.exports = { auths };