const express = require("express");
const {
	register,
	login,
	logout,
	editUser,
	deleteAccount,
	getAllUser,
} = require("../controllers/userController");
const { authenticateUser } = require("../auth/authentication");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/edit", authenticateUser, editUser);
router.delete("/", authenticateUser, deleteAccount);
router.get("/admin/users", getAllUser);
router.delete("/admin/users/:id");

module.exports = router;
