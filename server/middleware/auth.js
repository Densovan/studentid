require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN } = process.env;

const isAuth = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token, authorization dendied.',
      });
    }
    jwt.verify(accessToken, ACCESS_TOKEN, async (err, user) => {
      if (!err) {
        next();
      } else {
        return res.status(401).json({
          success: false,
          message: 'No authentication token, authorization dendied.',
        });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = isAuth;
