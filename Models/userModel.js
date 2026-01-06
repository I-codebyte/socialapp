const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: { type: String, unique: true, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		isAdmin: {type: Boolean, required: true, default: false}
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("user", userSchema)

module.exports = User
