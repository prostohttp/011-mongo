const api = require("../api/fetch");
const {v4: uuid} = require("uuid");

const PORT = process.env.REQ_PORT || 3333;
const BASE_URL = process.env.BASE_URL || "http://backend-redis";
const DB_PORT = process.env.DB_PORT || 3334;
const DB_URL = process.env.DB_URL || "http://backend-mongo";

const indexHandler = async (_, res) => {
  const books = await api.fetch(`${DB_URL}:${DB_PORT}/api/books`);
  res.render("books/index", {books: books});
};

const createHandler = (req, res) => {
  res.render("books/create");
};

const addBookHandler = async (req, res) => {
  const id = uuid();
  const {title, description, authors, favorite} = req.body;
  const fcover = req.files["filecover"] ? req.files["filecover"][0] : undefined;
  const fbook = req.files["filebook"] ? req.files["filebook"][0] : undefined;

  const data = {
    id,
    title,
    description,
    authors,
    favorite,
    fileName: title,
    filecover: fcover ? `/${fcover.path}` : `/public/no-image.jpeg`,
    filebook: fbook ? `/${fbook.path}` : `/public/no-image.jpeg`,
    originalNameFileCover: fcover
      ? fcover.originalname
      : `/public/no-image.jpeg`,
    originalNameFileBook: fbook
      ? fbook.originalname
      : `/public/no-image.jpeg`,
  };
  console.log(data.originalNameFileBook)
  console.log(data.originalNameFileCover)
  await api.fetch(`${DB_URL}:${DB_PORT}/api/books`, "POST", data);
  res.status(201);
  res.redirect("/");
};

const editHandler = async (req, res) => {
  const {id} = req.params;
  const book = await api.fetch(`${DB_URL}:${DB_PORT}/api/books/${id}`);
  if (book) {
    res.render("books/update", {book: book});
  } else {
    res.status(404);
    res.render("notFound");
  }
};

const updateHandler = async (req, res) => {
  const {id} = req.params;
  const book = await api.fetch(`${DB_URL}:${DB_PORT}/api/books/${id}`);
  const {title, description, authors, favorite, filecover, filebook} =
    req.body;
  let data;
  const fcover = req.files["filecover"] ? req.files["filecover"][0] : undefined;
  const fbook = req.files["filebook"] ? req.files["filebook"][0] : undefined;

  data = {
    ...book,
    title,
    description,
    authors,
    favorite,
    filecover: fcover ? `/${fcover.path}` : filecover,
    filebook: fbook ? `/${fbook.path}` : filebook,
  };

  if (book._id === id) {
    await api.fetch(`${DB_URL}:${DB_PORT}/api/books/${id}`, "PUT", data);
    res.status(204);
    res.redirect(`/books/${id}/update`);
  } else {
    res.status(404);
    res.render("notFound");
  }
};

const viewHandler = async (req, res) => {
  const {id} = req.params;
  const book = await api.fetch(`${DB_URL}:${DB_PORT}/api/books/${id}`);
  if (book._id === id) {
    const response = await api.fetch(
      `${BASE_URL}:${PORT}/counter/${id}/incr`,
      "POST"
    );
    res.render("books/view", {book, count: response.counter});
  } else {
    res.status(404);
    res.render("notFound");
  }
};

const deleteHandler = async (req, res) => {
  const {id} = req.params;
  const book = await api.fetch(`${DB_URL}:${DB_PORT}/api/books/${id}`);
  if (book._id === id) {
    await api.fetch(`${BASE_URL}:${PORT}/counter/${id}/del`, "POST");
    await api.fetch(`${DB_URL}:${DB_PORT}/api/books/${id}`, "DELETE");
    res.redirect("/");
  } else {
    res.status(404);
    res.render("notFound");
  }
};

module.exports = {
  index: indexHandler,
  create: createHandler,
  add: addBookHandler,
  edit: editHandler,
  update: updateHandler,
  view: viewHandler,
  delete: deleteHandler,
};
