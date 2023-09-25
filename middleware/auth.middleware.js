const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "MASAI");
      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.user = decoded.user;
        next();
      } else {
        res.json({ msg: "Not authorized" });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(400).json({ msg: "Please Login" });
  }
};

module.exports = {
  auth,
};
