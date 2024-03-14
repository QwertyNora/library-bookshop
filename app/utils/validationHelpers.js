function validateAuthor(author) {
  let errors = {};

  if (!author) {
    return {
      author: "No user body submitted",
    };
  }

  if (!author.name) {
    errors.name = "No name submitted";
  }

  if (!author.yearOfBirth) {
    errors.yearOfBirth = "No year of birth submitted";
  }

  const hasErrors = Object.keys(errors).length > 0;
  return [errors, hasErrors];
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

module.exports = {
  validateAuthor,
  validateBook,
};
