const express = require("express");
// const session = require("express-session");
const dotenv = require("dotenv").config();
const userRouters = require("./routes/userRouters");
const connectDB = require("./config/configDB");
const cookieParser = require("cookie-parser");


connectDB()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/", userRouters);

app.use((err, req, res, next) => {
	err.status = err.status || "Error";
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "server error";
    console.log(err.stack)

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});

app.listen(port, () => console.log(`server on port: ${port}`));
