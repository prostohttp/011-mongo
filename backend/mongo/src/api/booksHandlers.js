const Book = require("../model/Book");

const getAllBooksHandler = async (_, res) => {
	try {
		const books = await Book.find().select("-__v");
		res.json(books);
	} catch (error) {
		res.status(500).json(error);
	}
};

const getBookHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findById(id).select("-__v");
		if (book) {
			res.json(book);
		} else {
			res.status(404).json({ message: "book not found" });
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const addBookHandler = async (req, res) => {
	const {
		id,
		title,
		description,
		authors,
		favorite,
		fileName,
		filecover,
		filebook,
		originalNameFileCover,
		originalNameFileBook,
	} = req.body;
	const book = new Book({
		id,
		title,
		description,
		authors,
		favorite,
		filecover,
		filebook,
		fileName,
		originalNameFileCover,
		originalNameFileBook,
	});
	try {
		await book.save();
		res.status(201).json(book);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const deleteBookHandler = async (req, res) => {
	const { id } = req.params;
	try {
		await Book.findByIdAndDelete(id);
		res.status(200).json({ message: "ok" });
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const updateBookHandler = async (req, res) => {
	const {id} = req.params;
	const {
		title,
		description,
		authors,
		favorite,
		fileName,
		filecover,
		filebook,
		originalNameFileCover,
		originalNameFileBook,
	} = req.body;

	const book = {
		title,
		description,
		authors,
		favorite,
		filecover,
		fileName,
		filebook,
		originalNameFileCover,
		originalNameFileBook,
	};
	try {
		await Book.findByIdAndUpdate(id, book);
		res.redirect(`/api/books/${id}`);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

module.exports = {
	get: getBookHandler,
	getAll: getAllBooksHandler,
	add: addBookHandler,
	delete: deleteBookHandler,
	update: updateBookHandler
};
