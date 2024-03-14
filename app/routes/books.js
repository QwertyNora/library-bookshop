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
  //Get author from body
  const newBook = {
    ...req.body,
  };

  // validate input fields
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
  const books = await readDatabaseFile(databasePath);
  let booksResponse = [...books];

  res.json(booksResponse);
});

module.exports = router;
