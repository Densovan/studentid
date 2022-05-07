const express = require("express");

const router = new express.Router();

const { login, logout, verifyToken } = require("../controllers/auth");

//  ===== Login =====
router.post("/login", login);
router.get("/token/verify", verifyToken);
router.get("/logout", logout);

module.exports = router;
