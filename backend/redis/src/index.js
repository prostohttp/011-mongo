const express = require("express");

const counterRouter = require("./routes/apiCounterRouter");

const app = express();
app.use(express.json());
app.use("/counter", counterRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});