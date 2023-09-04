const express = require("express");
const apiBooks = require("../api/booksHandlers");

const apiBooksRouter = express.Router();

apiBooksRouter.get("/:id", apiBooks.get);

apiBooksRouter.get("/", apiBooks.getAll);

apiBooksRouter.post("/", apiBooks.add);

apiBooksRouter.put("/:id", apiBooks.update);

apiBooksRouter.delete("/:id", apiBooks.delete);

module.exports = apiBooksRouter;
