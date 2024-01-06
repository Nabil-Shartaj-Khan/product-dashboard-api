const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check whether user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "User already exists!" });
    }

    // Create a new user object
    const userInfo = new User(req.body);
    userInfo.password = await bcrypt.hash(password, 10);
    await userInfo.save();

    return res.status(201).json({ message: "Successfully registered!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Account not found, please Register!" });
    }
    //check password

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res
        .status(401)
        .json({ message: "Incorrect password or username." });
    }

    const userObject = {
      email,
      name: user.name,
      _id: user._id,
    };

    const jwtToken = jwt.sign(userObject, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    userObject.jwtToken = jwtToken;
    return res
      .status(201)
      .json({ message: "Login successful!", data: userObject });
  } catch (e) {
    console.error(e);
    res.status(200).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
