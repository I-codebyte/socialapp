const { AuthenticationError, InvalidInput } = require("../utils/errorHandler");
const User = require("../Models/userModel");
const { tokenGen, tokenVerify } = require("../utils/token");
const bcrypt = require("bcrypt");

const salt = 10;

const register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const existingUsername = await User.find({ username });

		if (existingUsername.length > 0) {
			throw new InvalidInput(
				`a user already exist with ${username}`
			);
		}

		const existingEmail = await User.find({ email });

		if (existingEmail.length > 0) {
			throw new InvalidInput(
				`a user already exist with ${email}`
			);
		}

		const hashPass = await bcrypt.hash(password, salt);
		const user = new User({ username, email, password: hashPass });

		res.cookie("token", tokenGen(), {
			maxAge: 3600 * 2,
			httpOnly: true,
			secure: false,
			sameSite: true,
		});

		await user.save();
		await res.status(201).json({ username, email });
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = username
			? await User.find({ username })
			: await User.find({ email });

		if (user.length <= 0) {
			throw new InvalidInput(
				`user with ${
					username ? username : email
				} does not exist`
			);
		}

		const verifyPass = await bcrypt.compare(
			password,
			user[0].password
		);

		if (verifyPass) {
			res.cookie("token", tokenGen(), {
				maxAge: 3600 * 2,
				httpOnly: true,
				secure: false,
				sameSite: true,
			});

			res.status(200).json({
				username: user[0].username,
				email: user[0].email,
			});
		} else {
			throw new AuthenticationError("password incorrect");
		}
	} catch (err) {
		next(err);
	}
};

const logout = async (req, res, next) => {
	try {
		res.clearCookie();
		res.status(200).json({ message: "user logged out" });
	} catch (err) {
		next(err);
	}
};

module.exports = { register, login, logout };
