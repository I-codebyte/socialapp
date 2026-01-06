const express = require("express");
const { register, login, logout, editUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/edit", editUser)

module.exports = router;
