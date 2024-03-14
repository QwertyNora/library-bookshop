const { Router } = require("express");
const router = Router();

const { readDatabaseFile } = require("../utils/databaseHelpers");

const databasePath = "./app/database/authors.json";

// CRUD operations

// READ
router.get("/", async (req, res) => {
  const authors = await readDatabaseFile(databasePath);
  let authorsResponse = [...authors];

  res.json(authorsResponse);
});

module.exports = router;
