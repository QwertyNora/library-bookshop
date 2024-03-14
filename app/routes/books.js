const { Router } = require("express");
const router = Router();

const { readDatabaseFile } = require("../utils/databaseHelpers");

const databasePath = "./app/database/books.json";

// CRUD operations

// ----- CREATE -----

// ----- READ -----
// Get all books
router.get("/", async (req, res) => {
  const books = await readDatabaseFile(databasePath);
  let booksResponse = [...books];

  res.json(booksResponse);
});

module.exports = router;
