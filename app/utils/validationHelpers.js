function validateAuthor(author) {
  let errors = new Map();
  if (!author.name) {
    errors.set("name", "Name is required");
  }
  if (!author.yearOfBirth) {
    errors.set("email", "Year of birth is required");
  }

  return [Object.fromEntries(errors), errors.size > 0, errors];
}

function validateBook(book) {
  let errors = {};

  if (!book) {
    return {
      book: "No user body submitted",
    };
  }

  if (!book.title) {
    errors.title = "No title submitted";
  }

  if (!book.count) {
    errors.count = "No stock submitted";
  }

  if (!book.isbn) {
    errors.isbn = "No ISBN submitted";
  }

  if (!book.id) {
    errors.id = "No id submitted";
  }

  if (!book.description) {
    errors.description = "No description submitted";
  }

  if (!book.publishingDate) {
    errors.publishingDate = "No publishing date submitted";
  }

  if (!book.author) {
    errors.author = "No author submitted";
  }

  if (!book.author) {
    errors.author = "No author submitted";
  }

  if (!book.author.name) {
    errors.author = "No author name submitted";
  }

  if (!book.genres) {
    errors.author = "No genre(s) submitted";
  }

  const hasErrors = Object.keys(errors).length > 0;
  return [errors, hasErrors];
}

function validateAuthorUpdate(author, oldAuthor) {
  let errors = validateAuthor(author)[2];

  if (author.id !== oldAuthor.id) {
    errors.set("id", "ID cannot be changed");
  }

  return [Object.fromEntries(errors), errors.size > 0];
}

module.exports = {
  validateAuthor,
  validateBook,
  validateAuthorUpdate,
};
