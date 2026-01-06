const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const { AuthenticationError } = require("../utils/errorHandler");

const authenticateUser = async (req, res, next) => {
	const token = req.cookies.token;

	try {
		if (!token) {
			throw new AuthenticationError("Require Authentication");
		}

		const verifiedToken = tokenVerify(token);

		if (!verifiedToken) {
			throw new AuthenticationError("Require Authentication");
		}

		req.user = jwt.decode(token);

		next();
	} catch (err) {
		next(err);
	}
};

const authorizeUser = async (req, res, next) => {
	const { userID } = req.user;

	try {
		const user = await User.findById({ _id: userID });

		if (!user.isAdmin) {
			throw new AuthenticationError("unauthorize");
		}

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = { authenticateUser, authorizeUser };
