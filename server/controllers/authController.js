const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const userWithToken = { username, token }; // Create an object with username and token
    return res.json(userWithToken);
  } else {
    return res.status(401).json({
      error: "Unauthorized: Incorrect password",
    });
  }
};

exports.requireLogin = (req, res, next) => {
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1]; // เปลี่ยนเป็น index 1 เนื่องจากแยก token ออกมา
  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
