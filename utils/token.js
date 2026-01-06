const jwt = require("jsonwebtoken");

const tokenGen = (userID) => {
	return jwt.sign({ userID }, process.env.SECRET_KEY, {
		expiresIn: 3600 * 2,
	});
};

const tokenVerify = (token) => {
	return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = {tokenGen, tokenVerify}