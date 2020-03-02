const express = require("express");
const router = express.Router();
const Book = require("../models").Book;

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

/* GET books listing */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["title", "ASC"]] });
    console.log(books);
    res.render("books/index", { books, title: "BOOKS" });
  })
);

/* Create a new book form */
router.get("/new", (req, res) => {
  res.render("books/new", { book: {}, title: "New Book" });
});

/* POST create book */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    res.redirect("/books");
  })
);

/* Edit book form */
router.get(
  "/:id/edit",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("books/edit", { book, title: "Edit Book Entry" });
    } else {
      res.sendStatus(404);
    }
  })
);

/* Update a book */
// router.get(
//   "/:id/update",
//   asyncHandler(async (req, res) => {
//     const book = await Book.findByPk(req.params.id);
//     if (book) {
//       await book.update(req.body);
//       res.redirect("/");
//     } else {
//       res.sendStatus(404);
//     }
//   })
// );

/* Delete Book Entry. */
router.post(
  "/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.redirect("/books");
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
