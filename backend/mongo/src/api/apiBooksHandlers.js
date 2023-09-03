const getAllBooks = (req, res) => {
  res.json("all books");
}

const getBook = (req, res) => {
res.json("one book");
}

const addBook = (req, res) => {
  res.json("add book");
}

const updateBook = (req, res) => {
  res.json("update book");
}

const deleteBook = (req, res) => {
  res.json("delete book");
}

module.exports = {
  getAll: getAllBooks,
  get: getBook,
  add: addBook,
  update: updateBook,
  delete: deleteBook,
}