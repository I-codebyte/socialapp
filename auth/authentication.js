const jwt = require("jsonwebtoken");

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
