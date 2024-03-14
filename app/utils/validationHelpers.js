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

module.exports = {
  validateAuthor,
};
