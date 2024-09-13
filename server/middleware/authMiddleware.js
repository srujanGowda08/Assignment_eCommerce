const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

exports.verifySeller = (req, res, next) => {
  if (req.user.role !== "seller")
    return res.status(403).json({ error: "Access denied" });
  next();
};

exports.verifyBuyer = (req, res, next) => {
  if (req.user.role !== "buyer")
    return res.status(403).json({ error: "Access denied" });
  next();
};
