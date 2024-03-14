const { Router } = require("express");
const router = Router();

const {
  readDatabaseFile,
  writeDatabaseFile,
} = require("../utils/databaseHelpers");
const { validateAuthor } = require("../utils/validationHelpers");

const databasePath = "./app/database/authors.json";

// CRUD operations

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
    let authors = await readDatabaseFile(databasePath);
    authors.push(newAuthor);

    await writeDatabaseFile(databasePath, authors);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.warn("Error creating author", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

// ----- READ -----

router.get("/", async (req, res) => {
  const authors = await readDatabaseFile(databasePath);
  let authorsResponse = [...authors];

  res.json(authorsResponse);
});

router.get("/:id", (req, res) => {
  //TODO: add get author logic here
  res.status(404).send("Not implemented");
});

router.post("/", (req, res) => {
  //TODO: add create author logic here
  res.status(404).send("Not implemented");
});

router.put("/:id", (req, res) => {
  //TODO: add update author logic here
  res.status(404).send("Not implemented");
});

router.delete("/:id", (req, res) => {
  //TODO: add delete authors logic here
  res.status(404).send("Not implemented");
});

module.exports = router;
