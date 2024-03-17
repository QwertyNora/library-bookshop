const fs = require("fs/promises");
const uuid = require("uuid");

async function readDatabaseFile(path) {
  if (!path) {
    throw new Error("No path given to file");
  }

  try {
    const response = await fs.readFile(path, "utf-8");
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function writeDatabaseFile(path, data) {
  if (!path) {
    throw new Error("No path given to file");
  }
  try {
    const stringifiedData = JSON.stringify(data, null, 2);
    await fs.writeFile(path, stringifiedData, "utf-8");
    console.log("OK");
  } catch (error) {
    throw new Error(error);
  }
}

function generateUniqueId() {
  return uuid.v4().slice(0, 8);
}

function filterByGenre(books = [], genre) {
  return books.filter((book) =>
    book.genres
      .map((genre) => genre.toLowerCase())
      .includes(genre.toLowerCase())
  );
}

module.exports = {
  readDatabaseFile,
  writeDatabaseFile,
  generateUniqueId,
  filterByGenre,
};
