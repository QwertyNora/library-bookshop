const fs = require("fs/promises");

async function readDatabaseFile(path) {
  if (!path) {
    throw new Error("No path given to file");
  }

  try {
    const response = await fs.readFile(path, "utf-8");
    const data = JSON.parse(response);
    console.log("DATA: ", data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function writeDatabseFile(path, data) {
  if (!path) {
    throw new Error("No path given to file");
  }

  try {
  } catch (error) {}
}

module.exports = {
  readDatabaseFile,
};
