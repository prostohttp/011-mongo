const express = require("express");
const mongoose = require("mongoose");

const app = express();
const booksRouter = require("./routes/apiBookRouter");

app.use(express.json());
app.use("/demo/books", booksRouter);

const start = async (port, url) => {
	await mongoose.connect(url);
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
};

const PORT = process.env.PORT || 3334;
const URL_DB = process.env.URL_DB || "mongodb://root:example@mongo:27017/";
start(PORT, "mongodb://root:example@mongo:27017/books");
