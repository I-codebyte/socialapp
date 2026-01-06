class AuthenticationError extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 401;
		this.name = "AuthenticationError";
	}
}

class InvalidInput extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 400;
		this.name = "InvalidInput";
	}
}

module.exports = { AuthenticationError, InvalidInput };
