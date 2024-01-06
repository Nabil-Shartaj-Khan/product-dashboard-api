const jwt = require("jsonwebtoken");

const ensureAuth = async (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).json({ message: "Not authorized!" });
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    console.log(decoded);

    // No need for `if (!decoded)` check here as it will throw an error if invalid/expired

    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Expired or Invalid token!" });
  }
};

module.exports = {
  ensureAuth,
};
