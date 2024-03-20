const { Router } = require("express");
const router = Router();

const {
  readDatabaseFile,
  writeDatabaseFile,
} = require("../utils/databaseHelpers");
const { validateBook } = require("../utils/validationHelpers");

const databasePath = "./app/database/books.json";

// CRUD operations

// ----- CREATE -----
// Create new book:
router.post("/new-book", async (req, res) => {
  const newBook = {
    ...req.body,
  };

  const [errors, hasErrors] = validateBook(newBook);
  if (hasErrors) {
    return res.status(400).json({
      data: errors,
    });
  }

  try {
    let books = await readDatabaseFile(databasePath);
    books.push(newBook);

    await writeDatabaseFile(databasePath, books);
    res.status(201).json(newBook);
  } catch (error) {
    console.warn("Error creating author", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// ----- READ -----
// Get all books
router.get("/", async (req, res) => {
  const { author } = req.query;

  const books = await readDatabaseFile(databasePath);
  let booksResponse = [...books];

  if (author) {
    console.log(author, typeof author);
    const authorValue = author;
    booksResponse = booksResponse.filter(
      (book) => book.author.name == authorValue
    );
  }
  //   console.log(author);

  res.json(booksResponse);
});

// Get book by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const books = (await readDatabaseFile(databasePath)) || [];
    const book = books.find((book) => book.id == id);

    if (!book) {
      return res.status(404).json({
        message: "Book with given ID not found",
      });
    }

    res.json(book);
  } catch (error) {
    console.log("error: getting book", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
