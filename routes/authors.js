const { Router } = require("express");
const router = Router();

const { readDatabaseFile } = require("../utils/databaseHelpers");

const databasePath = "./database/authors.js";

// CRUD operations
