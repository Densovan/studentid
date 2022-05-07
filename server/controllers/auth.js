const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// =====>  Models <=====
const User = require("../models/user");

const { ACCESS_TOKEN, REFRESH_TOKEN_SECRET } = process.env;

const refreshMaxAge = 7 * 24 * 60 * 60;
const accessMaxAge = 15 * 60;

const createAccessToken = (id, fullname) => {
  return jwt.sign({ id, fullname }, ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (id, fullname) => {
  return jwt.sign({ id, fullname }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

exports.verifyToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(401).json(false);
    }
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
      if (!err) {
        const accessToken = createAccessToken(user.id, user.fullname);
        await res.cookie("access_token", accessToken, {
          httpOnly: true,
          secure: false,
          maxAge: accessMaxAge * 1000,
        });

        return res.status(200).json({
          user_id: user.id,
          success: true,
          fullname: user.fullname,
        });
      } else {
        return res.status(401).json({
          success: false,
        });
      }
    });
  } catch (error) {
    res.status(400).json(false);
  }
};

exports.logout = async (req, res) => {
  await res.status(202).clearCookie("access_token");
  await res.status(202).clearCookie("refresh_token").send("cookies cleared");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        code: 1,
        success: false,
        message: "Invalid Email or Password! ",
      });
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(400).json({
        code: 1,
        success: false,
        message: "Invalid Email or Password!",
      });
    } else {
      const access_token = createAccessToken(
        user._id,
        user.fullname,
        user.role
      );
      const refresh_token = createRefreshToken(
        user._id,
        user.fullname,
        user.role
      );

      await res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: false,
        maxAge: accessMaxAge * 1000,
      });

      await res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        maxAge: refreshMaxAge * 1000,
      });

      return res.json({
        success: true,
        fullname: user.fullname,
        role: user.role,
        _id: user._id,
        message: "Login with successfully.",
        access_token,
        refresh_token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
