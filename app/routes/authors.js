const { Router } = require("express");

const {
  readDatabaseFile,
  writeDatabaseFile,
  generateUniqueId,
} = require("../utils/databaseHelpers");

const {
  validateAuthor,
  validateAuthorUpdate,
} = require("../utils/validationHelpers");

const authorDatabasePath = "./app/database/authors.json";
const bookDatabasePath = "./app/database/books.json";

const router = Router();

// ----- READ -----

router.get("/", async (req, res) => {
  try {
    const authors = (await readDatabaseFile(authorDatabasePath)) || [];
    let authorsResponse = [...authors];

    res.json(authorsResponse);
  } catch (error) {
    console.log("Error: getting authors", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const authors = (await readDatabaseFile(authorDatabasePath)) || [];
    const author = authors.find((author) => author.id == id);

    if (!author) {
      return (
        res.status(404),
        json({
          message: "Author not found",
        })
      );
    }

    res.json(author);
  } catch (error) {
    console.log("Error: getting author", error.message);
  }
});

// ----- CREATE -----

// Create new author:
router.post("/new-author", async (req, res) => {
  //Get author from body
  const newAuthor = {
    ...req.body,
  };

  // validate input fields
  const [errors, hasErrors] = validateAuthor(newAuthor);
  if (hasErrors) {
    return res.status(400).json({
      data: errors,
    });
  }

  try {
    let authors = (await readDatabaseFile(authorDatabasePath)) || [];
    authors.push(newAuthor);

    await writeDatabaseFile(authorDatabasePath, authors);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.warn("Error creating author", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE Author
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newAuthor = req.body;
    const [errors, hasErrors] = validateAuthorUpdate(newAuthor, { id });
    if (hasErrors) {
      return res.status(400).json({
        errors,
      });
    }
    let authors = (await readDatabaseFile(authorDatabasePath)) || [];
    const authorIndex = authors.findIndex((author) => author.id == id);

    if (authorIndex === -1) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    if (authors[authorIndex].name !== newAuthor.name) {
      let books = (await readDatabaseFile(bookDatabasePath)) || [];
      books.forEach((book) => {
        if (book.author.name === authors[authorIndex].name) {
          book.author.name = newAuthor.name;
        }
      });
      await writeDatabaseFile(bookDatabasePath, books);
    }
    authors[authorIndex] = newAuthor;

    await writeDatabaseFile(authorDatabasePath, authors);
    res.json(newAuthor);
  } catch (error) {
    console.log("error: updating author", error.message);
    // Should be inacessible
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete author
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let authors = (await readDatabaseFile(authorDatabasePath)) || [];
    const authorIndex = authors.findIndex((author) => author.id == id);

    if (authorIndex === -1) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    authors.splice(authorIndex, 1);

    await writeDatabaseFile(authorDatabasePath, authors);
    res.status(204).end();
  } catch (error) {
    console.log("error: deleting author", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
