const express = require("express");
const book = require("../api/apiBooksHandlers");

const router = express.Router();
router.get("/", book.getAll)
router.get("/:id", book.get);
router.post("/", book.add);
router.put("/:id", book.update);
router.delete("/:id", book.delete);

module.exports = router